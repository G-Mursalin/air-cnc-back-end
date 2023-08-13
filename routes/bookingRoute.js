const express = require("express");
const { postABooking } = require("../controllers/bookingController");

// Routs
const bookingRoute = express.Router();

bookingRoute.route("/").post(postABooking);

module.exports = bookingRoute;
