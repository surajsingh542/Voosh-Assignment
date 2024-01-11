const Order = require("../../models/order/order");
const appError = require("../../utils/appError");

// Add order
const addOrderCtrl = async (req, res, next) => {
  try {
    // Adding User Id to be of logged in user if explicitly not provided
    req.body.user_id = req.body.user_id ?? req.userId;

    // Create Order
    const orderCreated = await Order.create(req.body);

    return res.json({
      status: "success",
      data: orderCreated,
    });
  } catch (error) {
    return next(appError(error.message));
  }
};

// Get Order
const getUserOrderCtrl = async (req, res, next) => {
  try {
    const orderDetails = await Order.find({
      user_id: req.query.user_id,
    }).populate({
      path: "user_id",
      select: {
        name: 1,
      },
    });
    res.json({
      status: "success",
      data: orderDetails,
    });
  } catch (error) {
    return next(appError(error.message));
  }
};

module.exports = {
  addOrderCtrl,
  getUserOrderCtrl,
};
