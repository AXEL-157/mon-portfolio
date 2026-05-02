const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY || "my_secret_key";

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT ERROR:", err.message);
    return res.status(403).json({ error: "Invalid or expired token" });
  }
}
module.exports = authenticateToken;
