const User = require("../models/userModel");
const { catchAsync } = require("../utils/catchAsync");

// Handlers

// Creating A User
const postAUser = catchAsync(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (user) {
    return res.status(201).send({
      status: "user is already in database",
    });
  }

  const newUser = await User.create({ email: req.body.email });
  res.status(201).send({
    status: "success",
  });
});

// Update The User Role
const makeAUserHost = catchAsync(async (req, res) => {
  const { email } = req.params;
  const user = await User.findOneAndUpdate({ email: email }, { role: "host" });

  if (!user) {
    return res.status(200).send({ status: "User not found" });
  }

  const updatedUser = await User.findOne({ email: email }).select("-__v");

  res.status(200).send({
    status: "successfully updated role to host",
    data: { updatedUser },
  });
});

module.exports = { postAUser, makeAUserHost };
