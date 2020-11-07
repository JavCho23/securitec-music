const InternalServerError = require("./internal_server_error");

class DiferentTypeError extends InternalServerError {
    constructor(type) {
        super("The object must be instance of"+type);
    }
}

module.exports = DiferentTypeError;