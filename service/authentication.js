const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const token = req.headers['token']; // Format: <token>
  if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token.' });

    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
