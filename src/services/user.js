import { UsersCollection } from '../models/user.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

export const createUser = async (payload) => {
  const password = crypto.randomBytes(12).toString('base64').slice(0, 12);
  const encryptedPassword = await bcrypt.hash(password, 10);

  const user = await UsersCollection.findOneAndUpdate(
    { email: payload.email },
    {
      $setOnInsert: {
        email: payload.email,
        name: payload.name || 'User',
        password: encryptedPassword,
      },
    },
    {
      new: true,
      upsert: true,
    },
  );

  return user;
};
