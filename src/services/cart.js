import { CartCollection } from '../models/cart';

export const createCart = async ({ userId, cart }) => {
  const newCart = CartCollection.create({
    userId,
    position: cart,
  });
  return newCart;
};
