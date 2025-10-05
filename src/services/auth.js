import { UsersCollection } from '../models/user.js';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import { getEnvVar } from '../utils/getEnvVar.js';
import { sendMail } from '../utils/sendMail.js';
import path from 'node:path';
import fs from 'node:fs/promises';
import { TEMPLATES_DIR } from '../constants/constants.js';
import handlebars from 'handlebars';

export const loginUser = async (email) => {
  const user = await UsersCollection.findOne({ email });

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

  const resetPasswordTemplatePath = path.join(
    TEMPLATES_DIR,
    'reset-password-email.hbs',
  );

  const templateSource = (
    await fs.readFile(resetPasswordTemplatePath)
  ).toString();

  const template = handlebars.compile(templateSource);
  const html = template({
    name: user.name,
    link: `${getEnvVar('APP_DOMAIN')}/auth/reset-password?token=${token}`,
  });

  await sendMail({
    to: email,
    subject: 'Reset password',
    html,
  });
};
