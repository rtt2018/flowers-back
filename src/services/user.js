import { UsersCollection } from '../models/user.js';
import bcrypt from 'bcrypt';

export const createUser = async (payload) => {
  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  const user = await UsersCollection.findOneAndUpdate(
    { email: payload.email },
    {
      $setOnInsert: {
        email: payload.email,
        name: payload.name,
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
