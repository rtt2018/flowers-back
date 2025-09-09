import { createUser } from './user.js';
import { getCartService } from '../services/cart.js';
import { createOrder } from '../services/order.js';

export const addOrderService = async (payload) => {
  const user = await createUser(payload);

  const userId = user._id || user.id;

  getCartService({ ...payload, userId });

  const order = createOrder({ ...payload, userId });

  return { user, order };
};
