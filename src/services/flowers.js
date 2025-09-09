import { FlowersCollection } from '../models/flowers.js';
import { SORT_ORDER } from '../constants/constants.js';

export const getFlowersService = async ({
  page = 1,
  perPage = 12,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
}) => {
  const limit = perPage;
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const flowersQuery = FlowersCollection.find();
  const [total, flowers] = await Promise.all([
    FlowersCollection.countDocuments(),
    flowersQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);
  const totalPages = Math.ceil(total / perPage);

  return {
    hits: flowers,
    page,
    perPage,
    totalItems: total,
    totalPages,
    hasPreviousPage: page > 1,
    hasNextPage: page < totalPages,
    ...(flowers.length === 0 && { message: 'No flowers found' }),
  };
};
