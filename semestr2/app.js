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

app.get("/ads/:id", (req, res) => {
  Ad.findById(req.params.id).then((ad) => {
    if (ad) {
      res.format({
        html: function () {
          res.send(`<div>
          <p>ID: ${ad.id}</p>
          <p>Title: ${ad.title}</p>
          <p>Description: ${ad.description}</p>
          <p>Author: ${ad.author}</p>
          <p>Category: ${ad.category}</p>
          <p>Tags: ${ad.tags}</p>
          <p>Price: ${ad.price} ${ad.currency}</p>
          <p>Location: ${ad.location}</p>
          <p>Contact: ${ad.contact}</p>
          <p>Creation date: ${ad.creationDate}</p>
          <p>Duration time: ${ad.durationTime} days</p>
          <p>Active: ${ad.isActive}</p>
          </div>`);
        },
        text: function () {
          res.send(
            `ID: ${ad.id}, Title: ${ad.title}, Description: ${ad.description}, Author: ${ad.author}, Category: ${ad.category}, Tags: ${ad.tags}, Price: ${ad.price} ${ad.currency}, Location: ${ad.location}, Contact: ${ad.contact}, Creation date: ${ad.creationDate}, Duration time: ${ad.durationTime} days, Active: ${ad.isActive}`
          );
        },
        json: function () {
          res.json(ad);
        },
      });
    } else {
      res.status(404).end();
    }
  });
});

app.get("/ads", (req, res) => {
  Ad.find({}).then((ads) => {
    res.json(ads);
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
