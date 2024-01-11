const mongoose = require("mongoose");

// DB Connection
const dbConnect = async () => {
  mongoose.set("strictQuery", true);
  await mongoose.connect(process.env.MONGO_URL);
};

module.exports = dbConnect;
