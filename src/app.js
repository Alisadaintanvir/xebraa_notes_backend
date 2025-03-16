require("module-alias/register");
require("dotenv").config();

if (process.env.NODE_ENV === "development") {
  require("module-alias").addAlias("@", __dirname + "/../src");
} else {
  require("module-alias").addAlias("@", __dirname);
}

// all imports should be done after module-alias
const express = require("express");
const mongoose = require("mongoose");
const { createServer } = require("http");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

// internal Import
const { notFoundHandler, errorHandler } = require("@/helpers/errorHandler");
const appRouter = require("@/routers/index");

const app = express();

app.use(express.json());
app.use(cookieParser());

// logger middleware to log request
app.use(morgan("dev"));

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
