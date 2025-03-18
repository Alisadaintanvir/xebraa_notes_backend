const bycrpt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createHttpError = require("http-errors");

const User = require("../../schemas/user.schema");
const { BCRYPT_SALT_ROUNDS } = require("../../constants/value.constant");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../services/token.service");

// register
const postRegister = async (req, res, next) => {
  const { name, email, password } = req.body;

  // check if user already exists
  const user = await User.findOne({ email });
  if (user) {
    return next(createHttpError(400, "User already exists!"));
  }

  // hash password
  const hashedPassword = await bycrpt.hash(password, BCRYPT_SALT_ROUNDS);

  // create user
  await User.create({
    name,
    email,
    password: hashedPassword,
  });

  res.status(201).json({ message: "User created successfully!" });
};

// Login
const postLogin = async (req, res, next) => {
  const { email, password } = req.body;

  // check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return next(createHttpError(400, "User not found!"));
  }

  // check if password is correct
  const isPasswordCorrect = await bycrpt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return next(createHttpError(400, "Password is incorrect!"));
  }

  const tokenPayload = {
    _id: user._id,
    email: user.email,
    name: user.name,
  };

  // generate access token
  const accessToken = generateAccessToken(tokenPayload);

  // generate refresh token
  const refreshToken = generateRefreshToken(tokenPayload);

  // update refresh token in database
  user.refreshToken = refreshToken;
  await user.save();

  // set refresh token in cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  res.status(200).json({ user: tokenPayload, accessToken, refreshToken });
};

// refresh token
const getRefreshToken = async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken)
    return res.status(403).json({ message: "Refresh token required" });

  const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  const user = await User.findById(decoded._id).select("-password");
  if (!user || user.refreshToken !== refreshToken) {
    return res.status(401).send({ error: "Invalid refresh token" });
  }

  const accessToken = generateAccessToken({
    _id: user._id,
    email: user.email,
    name: user.name,
  });

  res.status(200).json({
    accessToken,
    user,
  });
};

// logout user
const postLogout = async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(400).json({ message: "Refresh token is required" });
  }
  // update refresh token in database
  await User.findOneAndUpdate({ refreshToken }, { refreshToken: null });

  // clear refresh token cookie
  res.clearCookie("refreshToken");

  res.status(200).json({ message: "User logged out successfully!" });
};

module.exports = {
  postRegister,
  postLogin,
  getRefreshToken,
  postLogout,
};
