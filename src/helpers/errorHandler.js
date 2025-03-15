const createError = require("http-errors");
const { validationResult } = require("express-validator");

// 404 not found handler
function notFoundHandler(req, res, next) {
  next(createError(404, "Your requested content was not found!"));
}

// default error handler
function errorHandler(err, req, res, next) {
  res
    .status(err.status || 200)
    .json({ message: err.message, data: err.data, errors: err.errors });
}

const validationHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    // console.log(Object.keys(mappedErrors));
    next();
  } else {
    return next({
      status: 400,
      message: "Validation Failed!!!",
      errors: mappedErrors,
    });
  }
};

module.exports = { notFoundHandler, errorHandler, validationHandler };
