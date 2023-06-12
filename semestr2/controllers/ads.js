const adsRouter = require("express").Router();
const Ad = require("../models/ad");
const { adModificationGuard } = require("../utils/middleware");

adsRouter.post("/", async (req, res) => {
  const body = req.body;
  const user = res.locals.user;

  const ad = new Ad({
    title: body.title,
    description: body.description,
    author: user.fullName,
    category: body.category,
    tags: body.tags,
    price: body.price,
    currency: body.currency,
    location: body.location,
    contact: body.contact,
    creationDate: new Date(),
    isActive: true,
    user: user.id,
  });

  const savedAd = await ad.save();
  user.ads = user.ads.concat(savedAd._id);
  await user.save();
  res.json(savedAd);
  //   ad.save()
  //     .then((savedAd) => {
  //       res.json(savedAd.toJSON());
  //     })
  //     .catch((error) => console.log(error.message));
});

adsRouter.get("/:id", async (req, res) => {
  const ad = await Ad.findById(req.params.id);
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

adsRouter.get("/", async (req, res) => {
  const queryObj = req.query;
  if (!queryObj) {
    const ads = await Ad.find({}).populate("user", {
      username: 1,
      fullName: 1,
    });
    res.json(ads);
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
        caseInsensitiveQueryObj[key] = {
          $regex: queryObj[key],
          $options: "i",
        };
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

    const query = JSON.parse(queryStr);
    const ads = await Ad.find(query).populate("user", {
      username: 1,
      fullName: 1,
    });
    res.json(ads);
  }
});

adsRouter.delete(
  "/:id",
  (req, res, next) => {
    res.locals.params = req.params;
    next();
  },
  adModificationGuard,
  async (req, res) => {
    await Ad.findByIdAndRemove(req.params.id);
    res.status(204).end();
  }
);

adsRouter.put(
  "/:id",
  (req, res, next) => {
    res.locals.params = req.params;
    next();
  },
  adModificationGuard,
  async (req, res) => {
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

    updatedAd = await Ad.findByIdAndUpdate(req.params.id, ad, { new: true });
    res.json(updatedAd);
  }
);

module.exports = adsRouter;
