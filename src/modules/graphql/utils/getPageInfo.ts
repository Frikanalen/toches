export const getPageInfo = (count: number, page: number, perPage: number) => ({
  hasNextPage: perPage * (page + 1) <= count,
  hasPreviousPage: page > 1,
  page: page,
  perPage: perPage,
  totalItems: count,
  totalPages: count / perPage,
})
