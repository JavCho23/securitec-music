const Login = require("../core/user/aplication/login");
const User = require("../core/user/domain/user");
const UserRepository = require("../core/user/infrastructure/mysql_user_repository");

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
