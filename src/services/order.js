import { OrderCollection } from '../models/order.js';
import { Types } from 'mongoose';

export const createOrder = async ({
  userId,
  cart,
  totalPrice,
  adress,
  phone,
}) => {
  const normalizeCart = cart.map((position) => {
    return {
      flower: Types.ObjectId.createFromHexString(position._id),
      price: position.price,
      amount: position.amount,
    };
  });

  const newOrder = await OrderCollection.create({
    userId,
    cart: normalizeCart,
    totalPrice,
    adress,
    phone,
    status: 'pending',
    createdAt: new Date(),
  });

  return newOrder;
};

export const getAllOrdersService = async (userId) => {
  const orders = await OrderCollection.find({ userId });
  return orders;
};
