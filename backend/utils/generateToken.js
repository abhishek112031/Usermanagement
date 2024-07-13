const jwt = require("jsonwebtoken");

const generateAccessToken = async (email) => {
  const token = jwt.sign({ email: email }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });
  return token;
};

module.exports = generateAccessToken;
