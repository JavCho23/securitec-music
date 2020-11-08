const InvalidValueError = require("../../../errors/invalid_value_error");

class User {
  constructor(name, password) {
    this.name = name;
    this.password = password;
  }
}

module.exports = User;
