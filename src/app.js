require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const { createServer } = require("http");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");

// internal Import
const { notFoundHandler, errorHandler } = require("./helpers/errorHandler");
const appRouter = require("./modules/app.router");

const app = express();

app.use(express.json());
app.use(cookieParser());
// app.use(
//   cors({
//     origin: "http://localhost:8000", // Your frontend URL
//     credentials: true, // Allow cookies (refresh token)
//   })
// );

var whitelist = process.env.ALLOWED_ORIGIN ? [process.env.ALLOWED_ORIGIN] : [];

var corsOptions = {
  origin: function (origin, callback) {
    if (
      process.env.NODE_ENV?.toString() === "development" ||
      whitelist.indexOf(origin) !== -1
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

// logger middleware to log request
app.use(morgan("dev"));

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the backend server!");
});

const server = createServer(app);

// database connection
mongoose
  .connect(process.env.MONGO_URI || "")
  .then(async () => {
    console.log("DB connection successfully!");
  })
  .catch((err) => {
    console.log(err);
  });

// app router
app.use(appRouter);

// 404 not found handler
app.use(notFoundHandler);

// common error handler
app.use(errorHandler);

server.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
