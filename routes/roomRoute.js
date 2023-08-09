const express = require("express");
const { postARoom } = require("../controllers/roomController");

// Routs
const roomRoute = express.Router();

roomRoute.route("/").post(postARoom);

module.exports = roomRoute;
