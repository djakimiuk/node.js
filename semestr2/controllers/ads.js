const adsRouter = require("express").Router();
const Ad = require("../models/ad");

adsRouter.post("/", async (req, res) => {
  const body = req.body;

  const user = await user.findById(body.userId);

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
    isActive: true,
  });

  ad.save()
    .then((savedAd) => {
      res.json(savedAd.toJSON());
    })
    .catch((error) => console.log(error.message));
});

adsRouter.get("/:id", (req, res) => {
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

adsRouter.get("/", (req, res) => {
  const queryObj = req.query;
  if (!queryObj) {
    Ad.find({}).then((ads) => {
      res.json(ads);
    });
  } else {
    let caseInsensitiveQueryObj = { ...queryObj };

    Object.keys(queryObj).forEach((key) => {
      if (
        [
          "title",
          "description",
          "author",
          "category",
          "tags",
          "currency",
          "location",
        ].includes(key)
      ) {
        caseInsensitiveQueryObj[key] = { $regex: queryObj[key], $options: "i" };
      }
      if (key.match(/^creationdate$/i)) {
        caseInsensitiveQueryObj.creationDate = queryObj[key];
        delete caseInsensitiveQueryObj[key];
      }
      if (key.match(/^durationtime$/i)) {
        caseInsensitiveQueryObj.durationTime = queryObj[key];
        delete caseInsensitiveQueryObj[key];
      }
      if (key.match(/^isactive$/i)) {
        caseInsensitiveQueryObj.isActive = queryObj[key];
        delete caseInsensitiveQueryObj[key];
      }
    });

    let queryStr = JSON.stringify(caseInsensitiveQueryObj);

    const operatorRegex = new RegExp(/\b(lte|lt|gte|gt)\b/g);

    queryStr = queryStr.replace(operatorRegex, (match) => `$${match}`);

    console.log(queryStr);

    const query = JSON.parse(queryStr);

    Ad.find(query).then((ads) => {
      res.json(ads);
    });
  }
});

adsRouter.delete("/:id", (req, res) => {
  Ad.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => console.log(error));
});

adsRouter.put("/:id", (req, res) => {
  const body = req.body;

  const ad = {
    title: body.title,
    description: body.description,
    author: body.author,
    category: body.category,
    tags: body.tags,
    price: body.price,
    currency: body.currency,
    location: body.location,
    contact: body.contact,
    creationDate: body.creationDate,
    durationTime: body.durationTime,
    isActive: body.isActive,
  };

  Ad.findByIdAndUpdate(req.params.id, ad, { new: true })
    .then((updatedAd) => {
      res.json(updatedAd);
    })
    .catch((error) => console.log(error));
});

module.exports = adsRouter;
