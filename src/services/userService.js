const { User } = require('../database/models');
const InvalidFieldsError = require('../errors/InvalidFieldsError');
const UserAlreadyExistsError = require('../errors/UserAlreadyExistsError');

const userService = {
  async getUserByEmail(email) {
    const userByEmail = await User.findOne({
      where: { email },
    });
    return userByEmail;
  },
  async exists(email) {
    const userByEmail = await User.findOne({
      where: { email },
      attributes: ['email'],
    });
    if (!userByEmail) {
      throw new InvalidFieldsError('Invalid fields');
    }
  },
  async alreadyExists(email) {
    const userByEmail = await User.findOne({
      where: { email },
      attributes: ['email'],
    });
    if (userByEmail) {
      throw new UserAlreadyExistsError('User already registered');
    }
  },
  async add(newUser) {
    await User.create(newUser);
  },
};

module.exports = userService;