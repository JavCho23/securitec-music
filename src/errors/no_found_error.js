const ResponseError = require("./response_error");

class NoFoundError extends ResponseError {
  constructor() {
    super(404, "The requested resource was not found");
  }
}

module.exports = NoFoundError;
