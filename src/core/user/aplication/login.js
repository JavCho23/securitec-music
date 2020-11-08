const DiferentTypeError = require("../../../errors/diferent_type_error");
const UserRepository = require("../domain/user_repository");

class Login {
  constructor(repository) {
    if (!(repository instanceof UserRepository))
      throw new DiferentTypeError("UserRepository");
    this.repository = repository;
  }
  call(user) {
    return this.repository.login(user);
  }
}

module.exports = Login;
