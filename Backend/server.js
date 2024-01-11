require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dbConnect = require("./config/dbConnect");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const orderRoutes = require("./routes/order/order");
const userRoutes = require("./routes/users/users");

const app = express();

// cookie Parser
app.use(cookieParser());

// parse json data
app.use(express.json());

// parse application/xxx-www
app.use(express.urlencoded({ extended: true }));

// cors
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// ================ Routes =====================
// User Route
app.use(userRoutes);
// Order Route
app.use(orderRoutes);

// 404 not found
app.all("*", (req, res, next) => {
  res.status(404).json({
    msg: `${req.originalUrl} not found`,
  });
});

// Error Handler
app.use(globalErrorHandler);

const PORT = process.env.PORT ?? 3000;

const start = async () => {
  try {
    await dbConnect();
    console.info("Database Connected Successfully");
    app.listen(PORT, () => {
      console.info(`Server is up and running on PORT ${PORT}`);
    });
  } catch (error) {
    console.error("Server Error\n", error.name, error.message);
    process.exit(1);
  }
};

start();
