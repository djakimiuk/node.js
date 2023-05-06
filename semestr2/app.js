require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const Ad = require("./ad");

const loggerMiddleware = (req, res, next) => {
  console.log("Method:", req.method);
  console.log("Path:", req.path);
  console.log("Body:", req.body);
  console.log("###############");
  next();
};

app.use(bodyParser.json());
app.use(loggerMiddleware);

app.get("/heartbeat", (req, res) => {
  const today = new Date();
  res.send(today);
});

app.post("/ads", (req, res) => {
  const body = req.body;

  const ad = new Ad({
    title: body.title,
    description: body.description,
    author: body.author,
    category: body.category,
    tags: body.tags,
    price: body.price,
    currency: body.currency,
    location: body.location,
    contact: body.contact,
    creationDate: new Date(),
    durationTime: body.durationTime || 7,
    isActive: true,
  });

  ad.save()
    .then((savedAd) => {
      res.json(savedAd.toJSON());
    })
    .catch((error) => console.log(error.message));
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
