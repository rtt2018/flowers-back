import { ShopsCollection } from '../models/shops.js';

export const getShopsService = async () => {
  const shops = await ShopsCollection.find();

  return shops;
};
