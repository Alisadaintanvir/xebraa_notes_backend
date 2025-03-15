const createHttpError = require("http-errors");

const withErrorHandling = (fn) => async (req, res, next) => {
  return await Promise.resolve(fn(req, res, next)).catch((error) => {
    next(createHttpError(500, error.message));
  });
};

module.exports = { withErrorHandling };
