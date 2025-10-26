import { UsersCollection } from '../models/user.js';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import { getEnvVar } from '../utils/getEnvVar.js';
import { resend } from '../utils/sendMail.js';
import path from 'node:path';
import fs from 'node:fs/promises';
import {
  FIFTEEN_MINUTES,
  TEMPLATES_DIR,
  THIRTY_DAYS,
} from '../constants/constants.js';
import handlebars from 'handlebars';
import { getAllOrdersService } from './order.js';
import { Session } from '../models/session.js';
import crypto from 'node:crypto';

const createSession = () => {
  return {
    accessToken: crypto.randomBytes(32).toString('base64'),
    refreshToken: crypto.randomBytes(32).toString('base64'),
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
  };
};

export const sendLoginLinkService = async (email) => {
  // console.log('🚀 ~ sendLoginLinkService ~ email:', email);
  const user = await UsersCollection.findOne({ email });
  // console.log('🚀 ~ sendLoginLinkService ~ user:', user);

  if (!user) {
    throw new createHttpError.NotFound('User not found');
  }

  const token = jwt.sign(
    {
      sub: user._id,
      name: user.name,
    },
    getEnvVar('JWT_SECRET'),
    {
      expiresIn: getEnvVar('JWT_EXPIRES_IN'),
    },
  );

  const resetPasswordTemplatePath = path.join(TEMPLATES_DIR, 'login-user.hbs');

  const templateSource = (
    await fs.readFile(resetPasswordTemplatePath)
  ).toString();

  const template = handlebars.compile(templateSource);
  const html = template({
    name: user.name,
    link: `${getEnvVar('APP_DOMAIN')}/login?token=${token}`,
  });

  try {
    await resend.emails.send({
      from: getEnvVar('RESEND_MAIL'),
      to: email,
      subject: 'Authorization',
      html,
    });
    // console.log('🚀 ~ sendLoginLinkService ~ info:', info);
    return email;
  } catch {
    throw new createHttpError.BadGateway('Email not send!');
  }
};

export const loginUserService = async (token) => {
  try {
    const decoded = jwt.verify(token, getEnvVar('JWT_SECRET'));

    const user = await UsersCollection.findById(decoded.sub).lean();

    if (user === null) {
      throw new createHttpError.NotFound('User not found');
    }
    const sessionObj = createSession();

    const session = await Session.create({
      userId: user._id,
      ...sessionObj,
    });

    const orders = await getAllOrdersService(user._id);

    user.accessToken = session.accessToken;
    user.refreshToken = session.refreshToken;

    return { user, orders };
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new createHttpError.Unauthorized('Token is expired');
    }

    if (error.name === 'JsonWebTokenError') {
      throw new createHttpError.Unauthorized('Token is unauthorized');
    }

    throw error;
  }
};

export const refreshUserService = async (refreshToken) => {
  const session = await Session.findOne({ refreshToken });

  if (session === null) {
    throw new createHttpError.Unauthorized('Session not found');
  }
  if (session.refreshToken !== refreshToken) {
    throw new createHttpError.Unauthorized('Refresh token is invalid');
  }

  if (session.refreshTokenValidUntil < new Date()) {
    throw new createHttpError.Unauthorized('Refresh token is expired');
  }

  const newSession = createSession();

  await Session.deleteOne({ _id: session._id });

  return Session.create({
    userId: session.userId,
    ...newSession,
  });
};
