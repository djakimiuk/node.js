const mongoose = require("mongoose");

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

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username required!"],
    minLength: 5,
  },
  fullName: {
    type: String,
    required: [true, "Full name required!"],
  },
  passwordHash: String,
  ads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ad",
    },
  ],
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject.id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("User", userSchema);