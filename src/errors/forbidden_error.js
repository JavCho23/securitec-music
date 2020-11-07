const ResponseError = require("./response_error");

class ForbiddenError  extends ResponseError {
  constructor() {
    super(403, "You don't have permission to access on this server.");
  }
}

module.exports = ForbiddenError ;
