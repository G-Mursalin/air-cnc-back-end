const express = require("express");
const {
  postABooking,
  getAllGuestBookings,
  deleteBooking,
  getAllHostBookings,
} = require("../controllers/bookingController");
const { protect } = require("../controllers/userController");

// Routs
const bookingRoute = express.Router();

bookingRoute
  .route("/")
  .post(protect, postABooking)
  .get(protect, getAllGuestBookings);
bookingRoute.route("/:id").delete(protect, deleteBooking);
bookingRoute.route("/host").get(protect, getAllHostBookings);

module.exports = bookingRoute;
