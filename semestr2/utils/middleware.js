const User = require("../models/user");
const bcrypt = require("bcrypt");

const loggerMiddleware = (req, res, next) => {
  console.log("Method:", req.method);
  console.log("Path:", req.path);
  console.log("Body:", req.body);
  console.log("###############");
  next();
};

const authMiddleware = async (req, res, next) => {
  const token = req.get("authorization");
  const [username, password] = token.split(":");
  const user = User.findOne({ username });
  const passwordIsCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (token && user && passwordIsCorrect) {
    next();
  } else {
    res.status(401).json({ error: "Invalid username or password!" });
  }
};

module.exports = { loggerMiddleware, authMiddleware };
