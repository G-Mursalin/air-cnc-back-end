const Booking = require("../models/bookingModel");
const AppError = require("../utils/appError");
const { catchAsync } = require("../utils/catchAsync");

// Creating A Room
const postABooking = catchAsync(async (req, res) => {
  const newBooking = await Booking.create(req.body);
  res.status(201).send({
    status: "Successfully Room Booked!",
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  const { email } = req.query;

  const bookings = await Booking.find({ "guest.email": email });

  res.status(200).send({
    status: "success",
    results: bookings.length,
    data: { bookings },
  });
});

// Delete A booking via is
const deleteBooking = catchAsync(async (req, res) => {
  const booking = await Booking.findByIdAndDelete(req.params.id);
  if (!booking) {
    return next(new AppError("No booking found with that ID", 404));
  }
  res.status(201).send({ status: "Booking Canceled!", data: null });
});

module.exports = { postABooking, getAllBookings, deleteBooking };
