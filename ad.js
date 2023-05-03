const mongoose = requre("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

mongoose.connect(url).then((result) => {
  console
    .log(`connected to MongoDB`)
    .catch((error) => console.log(`There was an error: ${error.message}`));
});

const adSchema = new mongoose.Schema({
  title: String,
  description: String,
  author: String,
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
  },
  tags: [{ type: String }],
  price: Number,
  currency: {
    type: String,
    enum: ["PLN", "USD", "EUR", "GBP"],
    default: "PLN",
  },
  location: String,
  Contact: String,
  creationDate: { type: Date, default: new Date() },
  dueDate: Date,
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
