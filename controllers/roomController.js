const Room = require("../models/roomModel");
const AppError = require("../utils/appError");
const { catchAsync } = require("../utils/catchAsync");
const mongoose = require("mongoose");

// Creating A Room
const postARoom = catchAsync(async (req, res) => {
  const newRoom = await Room.create(req.body);

  res.status(201).send({
    message: "Successfully saved to database",
  });
});

// Get All Rooms
const getAllRooms = catchAsync(async (req, res) => {
  const rooms = await Room.find({ booked: false }).sort({ _id: -1 });

  res.status(201).send({
    status: "success",
    data: { rooms },
  });
});

// Get All Rooms
const getAllListingsRooms = catchAsync(async (req, res) => {
  const { email } = req.query;

  const rooms = await Room.find({ "host.email": email }).sort({ _id: -1 });

  res.status(201).send({
    status: "success",
    data: { rooms },
  });
});
// Get A Rooms
const getARoom = catchAsync(async (req, res) => {
  const { id } = req.params;

  const room = await Room.findById(id);
  res.status(201).send({
    status: "success",
    data: { room },
  });
});

// Update a Room Booking Status
const roomBookingStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const room = await Room.findByIdAndUpdate({ _id: id }, { booked: status });

  if (!room) {
    return next(new AppError("Failed to Find The Room!", 404));
  }

  res.status(200).send({
    message: "successfully updated room booking status",
  });
});

// Delete A Room via iD
const deleteRoom = catchAsync(async (req, res) => {
  const room = await Room.findByIdAndDelete(req.params.id);
  if (!room) {
    return next(new AppError("No room found with that ID", 404));
  }
  res.status(201).send({ message: "Room Deleted!", data: null });
});

// Update A Room Information
const updateARoom = catchAsync(async (req, res, next) => {
  const room = await Room.findByIdAndUpdate(req.params.id, req.body.data, {
    new: true,
    runValidators: true,
  });
  if (!room) {
    return next(new AppError("No tour found with that ID", 404));
  }
  res.status(200).send({ message: "successfully updated" });
});

module.exports = {
  postARoom,
  getAllRooms,
  getAllListingsRooms,
  getARoom,
  roomBookingStatus,
  deleteRoom,
  updateARoom,
};
