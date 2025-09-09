import { UsersCollection } from '../models/user.js';
import bcrypt from 'bcrypt';

export const createUser = async (payload) => {
  let user = UsersCollection.findOne({
    email: payload.email,
  });

  if (!user) {
    const encryptedPassword = await bcrypt.hash(payload.password, 10);
    user = UsersCollection.create({
      email: payload.email,
      name: payload.name,
      password: encryptedPassword,
      cart: payload.cart,
    });
  }
  return user;
};
