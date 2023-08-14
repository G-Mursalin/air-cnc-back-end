const Room = require("../models/roomModel");
const AppError = require("../utils/appError");
const { catchAsync } = require("../utils/catchAsync");
const mongoose = require("mongoose");

// Creating A Room
const postARoom = catchAsync(async (req, res) => {
  const newRoom = await Room.create(req.body);
  res.status(201).send({
    status: "Successfully saved to database",
  });
});

// Get All Rooms
const getAllRooms = catchAsync(async (req, res) => {
  const { email } = req.query;
  let rooms;
  if (email) {
    rooms = await Room.find({ "host.email": email }).sort({ _id: -1 });
  } else {
    rooms = await Room.find({ booked: false }).sort({ _id: -1 });
  }

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
    return res.status(200).send({ status: "Failed to Find The Room!" });
  }

  res.status(200).send({
    status: "successfully updated room booking status",
  });
});

// Delete A Room via iD
const deleteRoom = catchAsync(async (req, res) => {
  const room = await Room.findByIdAndDelete(req.params.id);
  if (!room) {
    return next(new AppError("No room found with that ID", 404));
  }
  res.status(201).send({ status: "Room Deleted!", data: null });
});

module.exports = {
  postARoom,
  getAllRooms,
  getARoom,
  roomBookingStatus,
  deleteRoom,
};
