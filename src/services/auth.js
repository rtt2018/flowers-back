import { UsersCollection } from '../models/user.js';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import { getEnvVar } from '../utils/getEnvVar.js';
import { resend } from '../utils/sendMail.js';
import path from 'node:path';
import fs from 'node:fs/promises';
import { TEMPLATES_DIR } from '../constants/constants.js';
import handlebars from 'handlebars';
import { getAllOrdersService } from './order.js';

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
    const info = await resend.emails.send({
      from: getEnvVar('RESEND_MAIL'),
      to: email,
      subject: 'Authorization',
      html,
    });
    console.log('🚀 ~ sendLoginLinkService ~ info:', info);
    return email;
  } catch {
    throw new createHttpError.BadGateway('Email not send!');
  }
};

export const loginUserService = async (token) => {
  try {
    const decoded = jwt.verify(token, getEnvVar('JWT_SECRET'));

    const user = await UsersCollection.findById(decoded.sub);

    if (user === null) {
      throw new createHttpError.NotFound('User not found');
    }

    const orders = await getAllOrdersService(user._id);

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
