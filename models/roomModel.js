const mongoose = require("mongoose");

//Schema
const roomSchema = new mongoose.Schema({
  location: { type: String, required: true, trim: true },
  title: { type: String, required: true, trim: true },
  from: { type: Date, required: true },
  to: { type: Date, required: true },
  price: { type: Number, required: true },
  guests: Number,
  bedrooms: Number,
  bathrooms: Number,
  description: String,
  category: { type: String, required: true },
  image: { type: String, required: true },
  host: {
    name: { type: String, required: true },
    image: { type: String },
    email: { type: String, required: true },
  },
});

// Model
const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
