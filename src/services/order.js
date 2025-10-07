import { OrderCollection } from '../models/order.js';
import { Types } from 'mongoose';
import { getCartService } from '../services/cart.js';
import { createUser } from './user.js';

export const createOrder = async ({
  userId,
  cart,
  totalPrice,
  adress,
  phone,
}) => {
  const normalizeCart = cart.map((position) => {
    return {
      flower: Types.ObjectId.createFromHexString(position.flower),
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
  const orders = await OrderCollection.find({ userId })
    .populate({
      path: 'cart.flower',
      model: 'flowers',
    })
    .exec();
  return orders;
};

export const addOrderService = async ({
  user,
  cart,
  totalPrice,
  adress,
  phone,
}) => {
  const findUser = await createUser(user);

  const userId = findUser._id || findUser.id;

  await getCartService({ cart, userId });

  const createdOrder = await createOrder({
    cart,
    userId,
    totalPrice,
    adress,
    phone,
  });

  const allOrders = await OrderCollection.find({ userId });

  return { user, order: createdOrder, orders: allOrders };
};
