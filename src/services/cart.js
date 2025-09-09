import { CartCollection } from '../models/cart.js';

export const getCartService = async ({ userId, cart }) => {
  const findCart = CartCollection.replaceOne(
    { userId },
    { userId, position: cart || [] },
    { upsert: true },
  );
  return findCart;
};
