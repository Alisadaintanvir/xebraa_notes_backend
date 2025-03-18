const { Router } = require("express");
const {
  postRegister,
  postLogin,
  postLogout,
  getRefreshToken,
  getVerifyToken,
} = require("./auth.controller");
const { validationHandler } = require("../../helpers/errorHandler");
const { registerValidator, loginValidator } = require("./auth.validator");
const withErrorHandling = require("../../utility/withErrorHandling");
const { authenticateToken } = require("../../middlewares/auth.middleware");

const router = Router();

// Signup User
router.post(
  "/register",
  registerValidator,
  validationHandler,
  withErrorHandling(postRegister)
);

// Login User
router.post(
  "/login",
  loginValidator,
  validationHandler,
  withErrorHandling(postLogin)
);

// Refresh Token
router.get("/refresh-token", withErrorHandling(getRefreshToken));

// Logout User
router.post("/logout", withErrorHandling(postLogout));

// Verify Token
router.get(
  "/verify-token",
  authenticateToken,
  withErrorHandling(getVerifyToken)
);

// Test
router.get("/test", (req, res) => res.send("Hello World!"));

module.exports = router;
