const jwt = require("jsonwebtoken");

const generateToken = (id, expiresIn = "1d") => {
  return jwt.sign({ id }, process.env.ACCESS_SECRET_TOKEN, { expiresIn });
};

module.exports = generateToken;
