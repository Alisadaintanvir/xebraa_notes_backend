require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const { createServer } = require("http");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");

// internal Import
const { notFoundHandler, errorHandler } = require("./helpers/errorHandler");
const appRouter = require("./routers/index");
const { initSocket } = require("./utility/socketHandler");
const corsOptions = require("./utility/corsConfig");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// logger middleware to log request
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Welcome to Note App");
});

const server = createServer(app);

// Initialize socket
initSocket(server);

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
