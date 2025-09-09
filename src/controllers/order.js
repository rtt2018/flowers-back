import { addOrderService, getOrderById } from '../services/index.js';
import { createUser } from '../services/user.js';
import { getAllOrdersService } from '../services/order.js';

export const addOrderController = async (req, res) => {
  const { user, order } = await addOrderService(req.body);

  res.status(200).json({
    message: 'Order created!',
    data: {
      user,
      order,
    },
  });
};

export const getOrderDetailController = async (req, res) => {
  const order = await getOrderById(req.params.id);

  res.status(200).json({
    message: 'Order details retrived!',
    data: {
      ...order,
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
