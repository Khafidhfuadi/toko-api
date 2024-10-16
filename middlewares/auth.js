const jwt = require("jsonwebtoken");
const User = require("../models/user"); // Ensure this path is correct

module.exports = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    console.log("Access Denied: No token provided");
    return res.status(401).json({ message: "Access Denied" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findByPk(verified.id);

    if (!req.user) {
      console.log("User not found for ID:", verified.id);
      return res.status(404).json({ message: "User not found" });
    }

    next();
  } catch (err) {
    console.error("Token verification error:", err.message);
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(400).json({ message: "Invalid Token" });
    } else {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
};
