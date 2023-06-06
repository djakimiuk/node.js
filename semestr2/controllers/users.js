const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.post("/", async (req, res) => {
  const body = request.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username: body.username,
    fullName: body.fullName,
    passwordHash: body.passwordHash,
  });

  user
    .save()
    .then((savedUser) => {
      res.json(savedUser);
    })
    .catch((error) => console.log(error.message));
});

usersRouter.get("/", (req, res) => {
  User.find({}).then((users) => {
    res.json(users);
  });
});

module.exports = usersRouter;
