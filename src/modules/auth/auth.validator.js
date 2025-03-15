const { body } = require("express-validator");

const registerValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/
    )
    .withMessage(
      "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
];

const loginValidator = [
  body("email").isEmail().withMessage("Email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

module.exports = { registerValidator, loginValidator };
