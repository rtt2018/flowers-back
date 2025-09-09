import { SORT_ORDER } from '../constants/constants.js';

const parseSortOrder = (sortOrder) => {
  const isKnownOrder = [SORT_ORDER.ASC, SORT_ORDER.DESC].includes(sortOrder);
  if (isKnownOrder) return sortOrder;
  return SORT_ORDER.ASC;
};

const parseSortBy = (sortBy) => {
  const keys = ['price', 'productionDate', '_id'];

  if (keys.includes(sortBy)) {
    return sortBy;
  }

  return '_id';
};

export function parseSortParams(value) {
  const { sortBy, sortOrder } = value;

  const parsedSortOrder = parseSortOrder(sortOrder);
  const parsedSortBy = parseSortBy(sortBy);

  return {
    sortOrder: parsedSortOrder,
    sortBy: parsedSortBy,
  };
}
