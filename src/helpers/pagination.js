const config = require("../config.json");

exports.getPaginationOptions = function (req) {
  const page =
    req.query.page !== undefined
      ? parseInt(req.query.page)
      : config.pagination.defaultPage;
  const limit =
    req.query.limit !== undefined
      ? parseInt(req.query.limit)
      : config.pagination.defaultLimit;

  return {
    page: page,
    limit: limit,
  };
};

exports.setPaginationHeaders = function (res, result) {
  res.set("Pagination-Page", result.page);
  res.set("Pagination-Limit", result.limit);
};
