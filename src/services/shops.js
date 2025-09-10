import { ShopsCollection } from '../models/shops';

export const getShopsService = async () => {
  const shops = await ShopsCollection.find();

  return shops;
};
