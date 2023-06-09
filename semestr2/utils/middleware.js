const User = require("../models/user");
const Ad = require("../models/ad");
const bcrypt = require("bcrypt");
const path = require("path");
const fs = require("fs");

const loggerMiddleware = (req, res, next) => {
  if (process.argv[2] === "debug") {
    const { method, path } = req;
    let requestTime = new Date().toString();
    const requestLog = `Request time: ${requestTime},
    Request method: ${method}, 
    Request path: ${path}
    ######################
    `;
    fs.appendFile("requestLogger.txt", requestLog, (error) => {
      if (error) {
        console.log(`There was an error: ${error}`);
      }
    });
  }
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

const errorHandler = (error, req, res, next) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

module.exports = {
  loggerMiddleware,
  authMiddleware,
  adModificationGuard,
  unknownEndpoint,
  errorHandler,
};
