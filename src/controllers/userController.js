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
  async getAll(_req, res) {
    const users = await userService.getAll();
    
    res.status(200).json(users);
  },
  async getById(req, res) {
    const { id } = req.params;
    const user = await userService.getById(id);
    
    res.status(200).json(user);
  },
  async delete(req, res) {
    const { userEmail } = req.token.data;
    await userService.deleteByEmail(userEmail);

    res.sendStatus(204);
  },
};

module.exports = userController;