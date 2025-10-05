import { getCartService, updateCartService } from '../services/cart.js';

export const getCartController = async (req, res) => {
  const userId = req.user._id;
  const userCart = await getCartService({ userId });

  res.status(200).json({
    message: 'User cart finded!',
    data: {
      ...userCart,
    },
  });
};

export const addCartController = async (req, res) => {
  const userId = req.user._id;
  const cart = req.cart;

  const findedUserCart = await updateCartService({ userId, cart });

  res.status(200).json({
    message: 'UserCart updated!',
    data: findedUserCart,
  });
};
