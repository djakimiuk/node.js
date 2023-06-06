require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const adsRouter = require("./controllers/ads");
const usersRouter = require("./controllers/users");
const middleware = require("./utils/middleware");

app.use(bodyParser.json());
app.use(middleware.loggerMiddleware);
app.use("/api/users", usersRouter);
app.use(middleware.authMiddleware);
app.use("/api/ads", adsRouter);

app.get("/heartbeat", (req, res) => {
  res.send(new Date().toISOString());
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
