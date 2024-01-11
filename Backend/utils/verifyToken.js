const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
  return jwt.decode(token, process.env.ACCESS_SECRET_KEY, (err, decoded) => {
    if (err) {
      return false;
    }
    return decoded;
  });
};

module.exports = verifyToken;
