import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { getFlowersService } from '../services/flowers.js';
import { parseSortParams } from '../utils/parseSortParams.js';

export const getFlowersController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);

  const flowers = await getFlowersService({ page, perPage, sortBy, sortOrder });

  res.status(200).json({
    message: 'Flowers retrieved successfully',
    data: {
      ...flowers,
    },
  });
};
