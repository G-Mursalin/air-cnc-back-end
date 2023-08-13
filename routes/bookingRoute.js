const express = require("express");
const {
  postABooking,
  getAllBookings,
  deleteBooking,
} = require("../controllers/bookingController");

// Routs
const bookingRoute = express.Router();

bookingRoute.route("/").post(postABooking).get(getAllBookings);
bookingRoute.route("/:id").delete(deleteBooking);

module.exports = bookingRoute;
