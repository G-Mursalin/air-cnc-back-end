const express = require("express");
const {
  postABooking,
  getAllGuestBookings,
  deleteBooking,
  getAllHostBookings,
} = require("../controllers/bookingController");

// Routs
const bookingRoute = express.Router();

bookingRoute.route("/").post(postABooking).get(getAllGuestBookings);
bookingRoute.route("/:id").delete(deleteBooking);
bookingRoute.route("/host").get(getAllHostBookings);

module.exports = bookingRoute;
