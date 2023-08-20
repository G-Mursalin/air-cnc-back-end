const express = require("express");
const { createPaymentIntent } = require("../controllers/paymentController");
const { protect } = require("../controllers/userController");

// Routs
const paymentRoute = express.Router();

paymentRoute.route("/create-payment-intent").post(protect, createPaymentIntent);

module.exports = paymentRoute;
