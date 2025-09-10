import { getShopsService } from '../services/shops.js';

export const getShopsController = async (req, res) => {
  const shops = await getShopsService();

  res.status(200).json({
    message: 'Shops list retrived!',
    data: {
      shops,
    },
  });
};
