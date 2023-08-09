const Room = require("../models/roomModel");
const { catchAsync } = require("../utils/catchAsync");

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
  console.log(id);

  const room = await Room.findById(id);
  res.status(201).send({
    status: "success",
    data: { room },
  });
});

module.exports = { postARoom, getAllRooms, getARoom };
