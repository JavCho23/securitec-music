const ResponseError = require("./response_error");

class RejectedError extends ResponseError {
  constructor(error) {
    super(420, error);
  }
}

module.exports = RejectedError;
