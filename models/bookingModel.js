const mongoose = require("mongoose");

//Schema
const bookingSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  guest: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    image: { type: String },
  },
  host: { type: String, required: true },
  location: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  from: { type: Date, required: true },
  to: { type: Date, required: true },
  roomId: { type: String, required: true },
  image: { type: String, required: true },
  transactionId: { type: String, required: true },
  date: { type: Date },
});

// Model
const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
