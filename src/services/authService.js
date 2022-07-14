const jwt = require('jsonwebtoken');
require('dotenv').config();

const authService = {
  async generateToken(userEmail) {
    const token = jwt.sign({ data: { userEmail } }, process.env.JWT_SECRET);
    return token;
  },
  async validateToken(token) {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    return decode;
  },
}; 

module.exports = authService;