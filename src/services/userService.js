const { User } = require('../database/models');
const InvalidFieldsError = require('../errors/InvalidFieldsError');

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
};

module.exports = userService;