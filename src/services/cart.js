import { CartCollection } from '../models/cart.js';

export const getCartService = async ({ userId }) => {
  const findCart = await CartCollection.findOne({ userId });
  return findCart;
};

export const updateCartService = async ({ userId, cart }) => {
  const findCart = await CartCollection.findOneAndUpdate(
    { userId },
    { userId, position: cart },
    { upsert: true },
  );
  return findCart;
};
