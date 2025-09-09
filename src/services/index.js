import { createUser } from './user.js';
import { createCart } from '../services/cart.js';
import { createOrder } from '../services/order.js';

export const addOrder = async (payload) => {
  const user = await createUser(payload);

  const userId = user._id || user.id;

  createCart({ ...payload, userId });

  const order = createOrder({ ...payload, userId });

  return { user, order };
};
