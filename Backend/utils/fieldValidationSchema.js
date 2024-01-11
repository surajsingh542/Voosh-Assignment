const { body, query } = require("express-validator");
const User = require("../models/users/user");

const userSignUpValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Please enter a valid string"),

  body("phone_number")
    .trim()
    .notEmpty()
    .withMessage("Phone Number is required")
    .isMobilePhone("en-IN")
    .withMessage("Please enter a valid phone Number.")
    .custom(async (value) => {
      const userFound = await User.findOne({ phone_number: value });
      if (userFound) {
        throw new Error("Phone Number Already in use");
      }
    }),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be 8 to 20 characters long"),
];

const userLoginValidation = [
  body("phone_number")
    .trim()
    .notEmpty()
    .withMessage("Phone Number is required")
    .isMobilePhone("en-IN")
    .withMessage("Please enter a valid phone Number."),

  body("password").notEmpty().withMessage("Password is required"),
  body("password")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be 8 to 20 characters long"),
];

const addOrderValidation = [
  body("user_id")
    .notEmpty()
    .withMessage("user_id is required.")
    .isMongoId()
    .withMessage("Please provide a valid user_id")
    .custom(async (value) => {
      const userFound = await User.findById(value);
      if (!userFound) {
        throw new Error("User does not exists.");
      }
    }),

  body("phone_number")
    .trim()
    .notEmpty()
    .withMessage("Phone Number is required")
    .isMobilePhone("en-IN")
    .withMessage("Please enter a valid phone Number."),

  body("sub_total")
    .notEmpty()
    .withMessage("sub_total is required.")
    .isFloat({ min: 0 })
    .withMessage("Please enter a valid sub_total"),
];

const getUserOrderDetailsValidation = [
  query("user_id")
    .notEmpty()
    .withMessage("user_id is required.")
    .isMongoId()
    .withMessage("Please provide a valid user_id")
    .custom(async (value) => {
      const userFound = await User.findById(value);
      if (!userFound) {
        throw new Error("User does not exists.");
      }
    }),
];

module.exports = {
  userSignUpValidation,
  userLoginValidation,
  addOrderValidation,
  getUserOrderDetailsValidation,
};
