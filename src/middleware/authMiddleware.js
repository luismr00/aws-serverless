const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const parts = authHeader.split(' ');
  const bearerIndex = parts.findIndex(part => part === 'Bearer');
  const token = parts[bearerIndex + 1];
  //

  console.log('hello from authMiddleware');
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Failed to authenticate token' });
    }

    req.user = decoded;
    next();
  });
};

module.exports = authMiddleware;
