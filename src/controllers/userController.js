const authService = require('../services/authService');
const userService = require('../services/userService');
const validations = require('../services/validations');

const userController = {
  async add(req, res) {
    const newUser = await validations.newUser(req.body);
    await userService.alreadyExists(newUser.email);
    await userService.add(newUser);
    const token = await authService.generateToken(newUser.email);

    res.status(201).json({ token });
  },
};

module.exports = userController;