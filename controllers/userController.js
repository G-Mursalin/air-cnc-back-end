const User = require("../models/userModel");
const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { catchAsync } = require("../utils/catchAsync");

// Helping Functions
const createToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_SECRET);
};

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
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please login to get access", 401)
    );
  }

  const decodedToken = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );

  const freshUser = await User.findOne({ email: decodedToken.email });
  if (!freshUser) {
    return next(new AppError("This user does not exist", 401));
  }

  req.user = freshUser;
  next();
});

// Check if a user role is Host or not
const isHost = catchAsync(async (req, res) => {
  const user = await User.findOne({ email: req.params.email });

  if (!user) {
    return next(new AppError("This user does not exist", 401));
  }

  const isHost = user.role === "host";
  res.status(200).send({ isHost });
});

// Creating JWT token using user Email
const getJWTToken = catchAsync(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    const token = createToken(user.email);
    res.status(200).send({ accessToken: token });
  } else {
    res.status(200).send({ accessToken: "" });
  }
});

module.exports = { postAUser, makeAUserHost, protect, isHost, getJWTToken };
