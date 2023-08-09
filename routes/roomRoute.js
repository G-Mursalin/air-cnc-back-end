const express = require("express");
const {
  postARoom,
  getAllRooms,
  getARoom,
} = require("../controllers/roomController");

// Routs
const roomRoute = express.Router();

roomRoute.route("/").post(postARoom).get(getAllRooms);
roomRoute.route("/:id").get(getARoom);

module.exports = roomRoute;
