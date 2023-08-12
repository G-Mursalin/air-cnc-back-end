const express = require("express");
const {
  postAUser,
  makeAUserHost,
  protect,
  isHost,
} = require("./../controllers/userController");

// Routs
const userRoute = express.Router();

userRoute.route("/").post(postAUser);
userRoute.route("/host/:email").get(protect, isHost);
userRoute.route("/:email").patch(makeAUserHost);

module.exports = userRoute;
