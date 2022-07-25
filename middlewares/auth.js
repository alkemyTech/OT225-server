const jwt = require("jsonwebtoken");
require("dotenv").config();

async function verifyRole(req, res, next) {
  try {
    const token = req.header("Authorization").split(" ")[0];
    const data = jwt.verify(token, process.env.SECRET_JWT);
    console.log(data);
    if (data.roleId) {
      next();
    } else {
      res.status(403).json({ error: "Unauthorized", message: "Access denied" });
    }
  } catch {
    res
      .status(401)
      .json({ error: "Unauthorized", message: "Token verification failed" });
  }
}

const verifyToken = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      res
        .status(403)
        .json({ error: "Unauthorized", message: " Access denied" });
    } else {
      const decoded = jwt.verify(token, process.env.SECRET_JWT);
      req.user = decoded;
      next();
    }
  } catch (error) {
    res.status(401).json({ error: "Invalid token", message: error.message });
  }
};

module.exports = { verifyRole, verifyToken };
