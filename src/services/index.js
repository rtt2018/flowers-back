import { createUser } from './user.js';
import { getCartService } from '../services/cart.js';
import { createOrder } from '../services/order.js';
import { OrderCollection } from '../models/order.js';

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
