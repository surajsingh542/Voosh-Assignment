const getTokenFromCookie = (req) => {
  const token = req.cookies?.access_token;
  if (!token) {
    return false;
  }
  return token;
};

module.exports = getTokenFromCookie;
