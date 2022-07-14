const authService = require('../services/authService');
const userService = require('../services/userService');
const validations = require('../services/validations');

const authController = {
  async login(req, res) {
    const { email } = req.body;
    await validations.loginPayload(req.body);
    await userService.exists(email);
    const user = await userService.getUserByEmail(email);
    await validations.password(user.password, req.body.password);
    const token = await authService.generateToken(email);
    res.status(200).json({ token });
  },
};

module.exports = authController;