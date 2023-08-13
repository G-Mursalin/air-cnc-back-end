const express = require("express");
const {
  postARoom,
  getAllRooms,
  getARoom,
  roomBookingStatus,
} = require("../controllers/roomController");

// Routs
const roomRoute = express.Router();

roomRoute.route("/").post(postARoom).get(getAllRooms);
roomRoute.route("/:id").get(getARoom);
roomRoute.route("/status/:id").patch(roomBookingStatus);

module.exports = roomRoute;
