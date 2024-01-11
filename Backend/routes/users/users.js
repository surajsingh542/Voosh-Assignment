const express = require("express");
const validationErrorHandler = require("../../middlewares/validationErrHandler");

const {
  userSignUpValidation,
  userLoginValidation,
} = require("../../utils/fieldValidationSchema");

const {
  userSignupCtrl,
  userLoginCtrl,
} = require("../../controllers/users/users");

const userRoutes = express.Router();

// route /api/add-user
userRoutes.post(
  "/add-user",
  userSignUpValidation,
  validationErrorHandler,
  userSignupCtrl
);

// route /api/login-user
userRoutes.post(
  "/login-user",
  userLoginValidation,
  validationErrorHandler,
  userLoginCtrl
);

module.exports = userRoutes;
