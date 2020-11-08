const ResponseError = require("./response_error");

class InternalServerError extends ResponseError {
  constructor(errorMessage) {
    super(500, errorMessage);
  }
}

module.exports = InternalServerError;
