const jwt = require("jsonwebtoken");
const RestError = require("../utils/restError.js");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Accesso negato, token mancante." }); // Unauthorized
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Token non valido." }); // Forbidden
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
