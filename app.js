const express = require("express");
const cors = require("cors");
const app = express();
const AppError = require("./utils/appError");
const { globalErrorController } = require("./controllers/errorController");
const userRoute = require("./routes/userRoute");
const roomRoute = require("./routes/roomRoute");
const bookingRoute = require("./routes/bookingRoute");
const paymentRoute = require("./routes/paymentRoute");

//Middleware

app.use(cors());
app.use(express.json());

//Routs
app.use("/api/v1/users", userRoute);
app.use("/api/v1/rooms", roomRoute);
app.use("/api/v1/bookings", bookingRoute);
app.use("/api/v1/payment", paymentRoute);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't not fine ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorController);

module.exports = app;
