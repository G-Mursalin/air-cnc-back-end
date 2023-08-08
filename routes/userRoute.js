const express = require("express");
const { postAUser, makeAUserHost } = require("./../controllers/userController");

// Routs
const userRoute = express.Router();

userRoute.route("/").put(postAUser);
userRoute.route("/:email").patch(makeAUserHost);

module.exports = userRoute;
