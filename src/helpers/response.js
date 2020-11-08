exports.sendNotFound = function (res) {
  return res.status(404).send({
    message: "Resource not found",
  });
};

exports.setHeadersForCORS = function (_, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, X-Access-Token, Content-Type, Accept"
  );
  next();
};
