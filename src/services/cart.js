import { CartCollection } from '../models/cart';

export const createCart = async ({ userId, cart }) => {
  const findCart = CartCollection.replaceOne(
    { userId },
    { userId, position: cart },
    { upsert: true },
  );
  return findCart;
};
