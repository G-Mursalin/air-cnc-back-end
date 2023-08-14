const express = require("express");
const {
  postARoom,
  getAllRooms,
  getARoom,
  roomBookingStatus,
  deleteRoom,
} = require("../controllers/roomController");

// Routs
const roomRoute = express.Router();

roomRoute.route("/").post(postARoom).get(getAllRooms);
roomRoute.route("/:id").get(getARoom).delete(deleteRoom);
roomRoute.route("/status/:id").patch(roomBookingStatus);

module.exports = roomRoute;
