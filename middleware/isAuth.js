const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const err = new Error("Not Authorized to access route");
    err.status = 401;
    throw err;
  }
  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    err.status = 500;
    throw err;
  }
  if (!decodedToken) {
    const err = new Error("Not Authenticated");
    err.status = 401;
    throw err;
  }
  req.userId = decodedToken.userId;
  next();
};
