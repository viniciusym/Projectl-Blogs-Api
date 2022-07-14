const authService = require('../services/authService');

const validateToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }
  const token = req.headers.authorization;
  await authService.validateToken(token);
  next();
};

module.exports = validateToken;