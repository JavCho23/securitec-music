const Login = require("../core/user/aplication/login");
const User = require("../core/user/domain/user");
const UserRepository = require("../core/user/infrastructure/mysql_user_repository");
const JWT = require("jsonwebtoken");
const config = require("../config.json");

exports.login = async function (req, res) {
  try {
    const login = new Login(new UserRepository());
    const token = await login.call(new User(req.body.user, req.body.password));
    res.json({ token: token });
  } catch (error) {
    console.log(error);
    res.status(error.responseCode).json({ message: error.message });
  }
};
exports.middleware = async function (req, res, next) {
  try {
    const token = req.headers.authorization;
    console.log(token)
    const payload = JWT.verify(token, config.auth.secret);
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "You need to autenticate" });
  }
};
