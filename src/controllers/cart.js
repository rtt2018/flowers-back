import { getCartService } from '../services/cart.js';

export const getCartController = async (req, res) => {
  const userId = req.user._id;
  const cart = req.cart;
  const userCart = getCartService({ userId, cart });

  res.status(200).json({
    message: 'User cart finded!',
    data: {
      ...userCart,
    },
  });
};
