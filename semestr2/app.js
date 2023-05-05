require("dotenv").config();
const Ad = require("./ad");
const express = require("express");
const app = express();

const loggerMiddleware = (req, res, next) => {
  console.log("Method:", req.method);
  console.log("Path:", req.path);
  console.log("Body:", req.body);
  console.log("###############");
  next();
};

app.use(express.json());
app.use(loggerMiddleware);

app.get("/heartbeat", (req, res) => {
  const today = new Date();
  res.send(today);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
