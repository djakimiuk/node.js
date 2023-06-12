require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("express-async-errors");
const app = express();
const adsRouter = require("./controllers/ads");
const usersRouter = require("./controllers/users");
const middleware = require("./utils/middleware");
const path = require("path");
mongoose.set("strictQuery", false);
const url = process.env.MONGODB_URI;

mongoose
  .connect(url)
  .then((result) => {
    console.log(`connected to MongoDB`);
  })
  .catch((error) => {
    console.log(`There was an error: ${error.message}`);
  });

app.use(bodyParser.json());
app.use(middleware.loggerMiddleware);
app.use("/api/users", usersRouter);
app.use(middleware.authMiddleware);
app.use("/api/ads", adsRouter);

app.get("/heartbeat", (req, res) => {
  res.send(new Date().toISOString());
});

app.use(express.static(path.join(__dirname, "./images")));
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
