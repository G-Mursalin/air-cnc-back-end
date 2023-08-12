const User = require("../models/userModel");
const AppError = require("../utils/appError");
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

// Protect a roust JWT
const protect = catchAsync(async (req, res, next) => {
  const { email } = req.params;
  const freshUser = await User.findOne({ email: email });

  if (!freshUser) {
    return next(new AppError("This user does not exist", 401));
  }

  req.user = freshUser;
  next();
});

// Check if a user role is Host or not
const isHost = catchAsync(async (req, res) => {
  const isHost = req.user.role === "host";
  res.status(200).send({ isHost });
});

module.exports = { postAUser, makeAUserHost, protect, isHost };
