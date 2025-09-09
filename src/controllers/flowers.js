import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { getFlowersService } from '../services/flowers.js';

export const getFlowersController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);

  const flowers = await getFlowersService({ page, perPage });

  res.status(200).json({
    message: 'Flowers retrieved successfully',
    data: {
      ...flowers,
    },
  });
};
