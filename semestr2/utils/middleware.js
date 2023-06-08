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
  const user = await User.findOne({ username });
  const passwordIsCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);
  const result = { user, passwordIsCorrect };
  return result;
}

const authMiddleware = async (req, res, next) => {
  const token = req.get("authorization");
  const tokenVerificationResult = await tokenVerification(token);
  res.locals.user = tokenVerificationResult.user;

  if (tokenVerificationResult.passwordIsCorrect || req.method === "GET") {
    next();
  } else {
    res.status(401).json({ error: "Invalid username or password!" });
  }
};

module.exports = { loggerMiddleware, authMiddleware };
