require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const adsRouter = require("./controllers/ads");

const loggerMiddleware = (req, res, next) => {
  console.log("Method:", req.method);
  console.log("Path:", req.path);
  console.log("Body:", req.body);
  console.log("###############");
  next();
};

app.use(bodyParser.json());
app.use(loggerMiddleware);

app.use("/api/ads", adsRouter);

app.get("/heartbeat", (req, res) => {
  res.send(new Date().toISOString());
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
