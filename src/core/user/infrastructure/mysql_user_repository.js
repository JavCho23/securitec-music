const db = require("../../../db/mysql");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const config = require("../../../config.json");
const UserRepository = require("../domain/user_repository");
const NoFoundError = require("../../../errors/no_found_error");
const UnauthorizedError = require("../../../errors/unauthorized_error");
class MySqlUserRepository extends UserRepository {
  async login(user) {
    const password = await db.doQuery(
      `SELECT password as value FROM user WHERE  name = ? `,
      user.name
    );
    console.log(user, password[0].value);
    if (password.length == 0) throw new NoFoundError();
    if (!bcrypt.compareSync(user.password, password[0].value))
      throw new UnauthorizedError("Worng credentials");
    return JWT.sign({ name: user.name }, config.auth.secret);
  }
}

module.exports = MySqlUserRepository;
