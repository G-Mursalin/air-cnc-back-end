const express = require("express");
const {
  postARoom,
  getAllRooms,
  getARoom,
  roomBookingStatus,
  deleteRoom,
  getAllListingsRooms,
} = require("../controllers/roomController");

const { protect } = require("./../controllers/userController");

// Routs
const roomRoute = express.Router();

roomRoute.route("/").post(protect, postARoom).get(getAllRooms);
roomRoute.route("/my-listings").get(protect, getAllListingsRooms);
roomRoute.route("/:id").get(getARoom).delete(protect, deleteRoom);
roomRoute.route("/status/:id").patch(protect, roomBookingStatus);

module.exports = roomRoute;
