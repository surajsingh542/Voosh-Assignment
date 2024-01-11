const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    phone_number: {
      type: String,
      required: true,
    },
    sub_total: {
      type: Number,
      min: 0,
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
        return ret;
      },
    },
  }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
