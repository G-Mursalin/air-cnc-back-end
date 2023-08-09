const Room = require("../models/roomModel");
const { catchAsync } = require("../utils/catchAsync");

// Creating A User
const postARoom = catchAsync(async (req, res) => {
  const newRoom = await Room.create(req.body);
  res.status(201).send({
    status: "Successfully saved to database",
  });
});

module.exports = { postARoom };
