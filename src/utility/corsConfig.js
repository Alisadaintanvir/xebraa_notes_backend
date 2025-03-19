const cors = require("cors");

var whitelist = process.env.ALLOWED_ORIGIN
  ? process.env.ALLOWED_ORIGIN.split(",")
  : [];
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

module.exports = corsOptions;
