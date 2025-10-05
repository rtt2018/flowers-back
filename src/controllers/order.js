import { createUser } from '../services/user.js';
import { getAllOrdersService, addOrderService } from '../services/order.js';

export const addOrderController = async (req, res) => {
  const { user, order, orders } = await addOrderService(req.body);

  res.status(200).json({
    message: 'Order created!',
    data: {
      user,
      order,
      orders,
    },
  });
};

export const getAllUserOrders = async (req, res) => {
  const user = await createUser(req.body.user);

  const orders = await getAllOrdersService(user._id);

  res.status(200).json({
    message: 'Orders retrived!',
    data: {
      orders,
    },
  });
};
