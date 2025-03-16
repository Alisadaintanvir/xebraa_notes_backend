const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return next(createHttpError(401, "Unauthorized user"));
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return next(createHttpError(401, "Unauthorized user"));
    }
    req.user = decoded;
    next();
  } catch (error) {
    return next(
      createHttpError(401, "Unauthorized user", {
        errors: error.errors || undefined,
      })
    );
  }
};

module.exports = { authenticateToken };
