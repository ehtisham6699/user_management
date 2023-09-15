const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../../config/config");
const User = require("../../models/User");
const responseHandler = require("../../shared/utils/responseHandler");

////////////////////////////// user registeration /////////////////////////////////////
exports.register = async (req, res) => {
  try {
    const { email, password, birthDate,name } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return responseHandler.fail(res, "User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, password: hashedPassword, birthDate,name });
    await newUser.save();

    responseHandler.success(res, newUser,"User Registered Successfully");
  } catch (error) {
    responseHandler.fail(res, error.message,{},error.status);
  }
};

//////////////////////////// user login ///////////////////////////////
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return responseHandler.fail(res, "Authentication failed", {}, 401);
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return responseHandler.fail(res, "Authentication failed", {}, 401);
    }

    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)

    responseHandler.success(res, { accessToken, refreshToken },"Login Successful");
  } catch (error) {
    responseHandler.fail(res, error.message);
  }
};

////////////////// Generate Access Token for the logged in user /////////////////
exports.refreshToken = async (req, res) => {
  try {
    const refreshToken = req.body.refreshToken;
  
    if (!refreshToken) {
     return responseHandler.fail(res, "Refresh Token not Found");
    }
    jwt.verify(refreshToken, config.jwtRefreshSecret, (err, user) => {
      if (err) {
        return responseHandler.fail(res, "Invalid Refresh Token");
      }
      const accessToken = generateAccessToken(user)
      responseHandler.success(res, { accessToken });
    });
  } catch (error) {
    responseHandler.fail(res, error.message);
  }
};

const generateAccessToken = (user) => {
  return jwt.sign({ _id: user._id, email: user.email },config.jwtAccessSecret,{
      expiresIn: config.accessTokenExpiresIn,
    });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ _id: user._id, email: user.email }, config.jwtRefreshSecret, {
    expiresIn: config.refreshTokenExpiresIn,
  });
};

