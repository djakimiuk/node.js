const User = require("../models/user");
const Ad = require("../models/ad");
const bcrypt = require("bcrypt");
const path = require("path");

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

const adModificationGuard = async (req, res, next) => {
  if (req.method !== "PUT" && req.method !== "DELETE") {
    next();
  }
  const ad = await Ad.findById(res.locals.params.id);
  const user = res.locals.user;
  if (user.id === ad.user._id.toString() || user.role === "admin") {
    next();
  } else {
    res.status(401).json({ error: "You are not allowed to modify that ad!" });
  }
};

const unknownEndpoint = (req, res) => {
  res.set("Content-Type", "image/png");
  res.status(404).sendFile(path.join(__dirname, "../images/404image.avif"));
};

module.exports = {
  loggerMiddleware,
  authMiddleware,
  adModificationGuard,
  unknownEndpoint,
};
