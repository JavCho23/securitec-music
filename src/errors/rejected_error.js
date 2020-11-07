const ResponseError = require("./response_error");

class RejectedError extends ResponseError {
  constructor(error) {
    super(420, error? error :"Your request is already rejected");
  }
}

module.exports = RejectedError;
