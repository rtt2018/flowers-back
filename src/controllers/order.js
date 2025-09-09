import { addOrderService } from '../services/index.js';

export const addOrderController = async (req, res) => {
  const order = addOrderService(req.body);

  res.status(200).json({
    message: 'Order created!',
    data: {
      ...order,
    },
  });
};
