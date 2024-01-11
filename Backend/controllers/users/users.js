const User = require("../../models/users/user");
const bcrypt = require("bcryptjs");
const generateToken = require("../../utils/generateToken");
const appError = require("../../utils/appError");

// User SignUp
const userSignupCtrl = async (req, res, next) => {
  try {
    const { password } = req.body;

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    req.body.password = hashedPassword;

    // Create User
    const user = await User.create(req.body);

    const token = generateToken(user._id, process.env.tokenAge);

    return res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: process.env.tokenAge * 1000,
      })
      .json({
        status: "success",
        data: user,
        token,
        expiresIn: process.env.tokenAge,
      });
  } catch (error) {
    return next(appError(error.message));
  }
};

// User Login
const userLoginCtrl = async (req, res, next) => {
  try {
    const { phone_number, password } = req.body;

    // Check if user exists
    let userFound = await User.findOne({
      phone_number,
    });

    if (!userFound) {
      return next(appError("Invalid Login Credentials", 401));
    }

    // check for password validity
    const isPasswordMatch = await bcrypt.compare(password, userFound.password);
    if (!isPasswordMatch) {
      return next(appError("Invalid Login Credentials", 401));
    }

    const token = generateToken(userFound._id, process.env.tokenAge);

    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: process.env.tokenAge * 1000,
      })
      .json({
        status: "success",
        data: userFound,
        token,
        expiresIn: process.env.tokenAge,
      });
  } catch (error) {
    return next(appError(error.message));
  }
};

module.exports = {
  userSignupCtrl,
  userLoginCtrl,
};
