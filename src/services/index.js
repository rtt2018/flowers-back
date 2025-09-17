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

  return { user, order: createdOrder };
};

export const getOrderById = async (id) => {
  const order = await OrderCollection.findById(id)
    .populate({
      path: 'cart.flower',
      model: 'flowers',
    })
    .lean();

  return order;
};
