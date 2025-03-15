const { Router } = require("express");
const { postRegister, postLogin, postLogout } = require("./auth.controller");
const { validationHandler } = require("@/helpers/errorHandler");
const { registerValidator, loginValidator } = require("./auth.validator");
const { withErrorHandling } = require("../../utility/withErrorHandling");

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

// Logout User
router.post("/logout", withErrorHandling(postLogout));

module.exports = router;
