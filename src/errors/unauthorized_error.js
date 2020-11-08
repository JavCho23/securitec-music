const ResponseError = require("./response_error");

class UnauthorizedError extends ResponseError {
  constructor(message) {
    super(401, message);
  }
}

module.exports = UnauthorizedError;
