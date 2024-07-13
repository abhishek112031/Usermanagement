const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authenticate = async (req, res, next) => {
  const token = req.headers["authorization"];

  try {
    if (!token) {
      return res
        .status(401)
        .json({ error: "Access denied. No token provided." });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = await User.findById(decoded.userId);
    next();
  } catch (error) {
    return res.status(400).json({ error: "Invalid token." });
  }
};

module.exports = authenticate;
