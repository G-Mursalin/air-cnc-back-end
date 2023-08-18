const express = require("express");
const {
  postAUser,
  makeAUserHost,
  protect,
  isHost,
  getJWTToken,
} = require("./../controllers/userController");

// Routs
const userRoute = express.Router();

userRoute.route("/").post(postAUser);
userRoute.route("/jwt").post(getJWTToken);
userRoute.route("/host/:email").get(isHost);
userRoute.route("/:email").patch(protect, makeAUserHost);

module.exports = userRoute;
