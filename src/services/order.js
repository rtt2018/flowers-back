import { OrderCollection } from '../models/order.js';
import { Types } from 'mongoose';

export const createOrder = async ({ userId, cart, totalPrice }) => {
  const normalizeCart = cart.map((position) => {
    return {
      _id: Types.ObjectId.createFromHexString(position._id),
      amount: position.amount,
    };
  });

  const newOrder = await OrderCollection.create({
    userId,
    cart: normalizeCart,
    totalPrice,
    status: 'pending',
    createdAt: new Date(),
  });

  return newOrder;
};

export const getAllOrdersService = async (userId) => {
  const orders = await OrderCollection.find({ userId });
  return orders;
};
