const User = require("../models/user");
const bcrypt = require("bcrypt");

const loggerMiddleware = (req, res, next) => {
  console.log("Method:", req.method);
  console.log("Path:", req.path);
  console.log("Body:", req.body);
  console.log("###############");
  next();
};

async function tokenVerification(token) {
  if (!token) {
    return false;
  }
  const [username, password] = token.split(":");
  if (username === "" || password === "") {
    return false;
  }
  const user = User.findOne({ username });
  const passwordIsCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);
  return passwordIsCorrect;
}

const authMiddleware = async (req, res, next) => {
  const token = req.get("authorization");

  if (await tokenVerification(token)) {
    next();
  } else {
    res.status(401).json({ error: "Invalid username or password!" });
  }
};

module.exports = { loggerMiddleware, authMiddleware };
