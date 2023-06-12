const mongoose = require("mongoose");

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
  role: {
    type: String,
    default: "user",
  },
  passwordHash: { type: String, required: [true, "Password required!"] },
  ads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ad",
    },
  ],
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
    delete returnedObject.role;
  },
});

module.exports = mongoose.model("User", userSchema);
