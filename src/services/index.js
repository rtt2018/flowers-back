import { createUser } from './user.js';
import { createCart } from '../services/cart.js';

export const addOrder = async (payload) => {
  const user = await createUser(payload);

  const userId = user._id || user.id;

  const cart = createCart({ ...payload, userId });

  const order = createOrder({ userId, cart });

  return;
};
