const ResponseError = require("./response_error");

class UnauthorizedError extends ResponseError {
  constructor(
    message = null
  ) {
    message = message || "Wrong credentials"
    super(401, message);
  }
}

module.exports = UnauthorizedError;
