const Booking = require("../models/bookingModel");
const { catchAsync } = require("../utils/catchAsync");

// Creating A Room
const postABooking = catchAsync(async (req, res) => {
  const newBooking = await Booking.create(req.body);
  res.status(201).send({
    status: "Successfully Room Booked!",
  });
});

module.exports = { postABooking };
