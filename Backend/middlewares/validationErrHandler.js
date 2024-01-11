const { validationResult } = require("express-validator");
const appError = require("../utils/appError");

const validationErrorHandler = (req, _, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(appError(errors.array()[0].msg, 406));
  }
  next();
};

module.exports = validationErrorHandler;
