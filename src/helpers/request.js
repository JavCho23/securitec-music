const pagination = require("./pagination");

exports.getRequestOptions = function (req) {
  const paginationOptions = pagination.getPaginationOptions(req);
  return Object.assign({}, paginationOptions);
};

exports.getFilteringOptions = function (req, parameters) {
  let options = {};
  parameters.forEach(function (param) {
    if (req.query[param] !== undefined) {
      options[param] = req.query[param];
    }
  });
  return options;
};
