const mongoose = requre("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

mongoose.connect(url).then((result) => {
  console
    .log(`connected to MongoDB`)
    .catch((error) => console.log(`There was an error: ${error.message}`));
});

const adSchema = new mongoose.Schema({
  title: { type: String, required: [true, "Title required!"] },
  description: { type: String, required: [true, "Description required!"] },
  author: { type: String, required: [, "Author required!"] },
  category: {
    type: String,
    enum: [
      "Electronics",
      "Books",
      "Home",
      "Pets",
      "Fashion",
      "Cars",
      "Jobs",
      "Events",
      "Cars",
    ],
    required: [true, "Category required!"],
  },
  tags: [{ type: String }],
  price: { type: Number, required: [true, "Price required!"] },
  currency: {
    type: String,
    enum: ["PLN", "USD", "EUR", "GBP"],
    default: "PLN",
    required: [true, "Currency required!"],
  },
  location: { type: String, required: [true, "Location required!"] },
  Contact: {
    type: String,
    validate: {
      validator: function (v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, "Phone number required!"],
  },
  creationDate: { type: Date, default: new Date() },
  durationTime: { type: Number, default: 7 },
  dueDate: { type: Date },
  isActive: { type: Boolean, default: true },
});

adSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Ad", adSchema);
