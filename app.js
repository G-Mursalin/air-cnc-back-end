const express = require("express");
const cors = require("cors");
const app = express();
const AppError = require("./utils/appError");
const { globalErrorController } = require("./controllers/errorController");
const userRoute = require("./routes/userRoute");
const roomRoute = require("./routes/roomRoute");

//Middleware
app.use(express.json());
app.use(cors());

//Routs
app.use("/api/v1/users", userRoute);
app.use("/api/v1/rooms", roomRoute);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't not fine ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorController);

module.exports = app;
