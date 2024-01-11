const getTokenFromCookie = require("../utils/getTokenFromCookie");
const verifyToken = require("../utils/verifyToken");
const User = require("../models/users/user");
const appError = require("../utils/appError");

const isLogin = async (req, res, next) => {
  const token = getTokenFromCookie(req);
  const decodedUser = verifyToken(token);

  if (!decodedUser) {
    return next(appError("Invalid/Expired Token, Please Login Again", 401));
  }

  let userExist = await User.findById(decodedUser.id);

  if (!userExist) {
    return next(appError("User does not exist, Please Login Again", 401));
  }

  // Saving in req to be accessed by controllers
  req.userId = decodedUser.id;

  // Store authenticated user into object
  res.locals.user = userExist.toJSON();

  next();
};

module.exports = isLogin;
