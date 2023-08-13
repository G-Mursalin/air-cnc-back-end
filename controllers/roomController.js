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
  const rooms = await Room.find();
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

module.exports = { postARoom, getAllRooms, getARoom, roomBookingStatus };
