import { OrderCollection } from '../models/order';

export const createOrder = async ({ userId, cart, totalPrice }) => {
  return OrderCollection.create({
    userId,
    cart,
    totalPrice,
    status: 'pending',
    createdAt: new Date(),
  });
};
