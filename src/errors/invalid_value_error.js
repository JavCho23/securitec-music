const ResponseError = require("./response_error");

class InvalidValueError extends ResponseError {
  constructor(error) {
    super(400, error ? error : "Your data has an invalid format");
  }
}

module.exports = InvalidValueError;
