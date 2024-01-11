const express = require("express");
const validationErrorHandler = require("../../middlewares/validationErrHandler");

const {
  addOrderValidation,
  getUserOrderDetailsValidation,
} = require("../../utils/fieldValidationSchema");

const {
  addOrderCtrl,
  getUserOrderCtrl,
} = require("../../controllers/order/orders");

const isLogin = require("../../middlewares/isLogin");

const orderRoutes = express.Router();

// route /api/add-order
orderRoutes.post(
  "/add-order",
  addOrderValidation,
  validationErrorHandler,
  isLogin,
  addOrderCtrl
);

// route /api/get-order
orderRoutes.get(
  "/get-order",
  getUserOrderDetailsValidation,
  validationErrorHandler,
  isLogin,
  getUserOrderCtrl
);

module.exports = orderRoutes;
