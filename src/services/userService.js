const { User } = require('../database/models');
const InvalidFieldsError = require('../errors/InvalidFieldsError');
const UserAlreadyExistsError = require('../errors/UserAlreadyExistsError');
const UserNotFound = require('../errors/UserNotFound');

const userService = {
  async getUserByEmail(email) {
    const userByEmail = await User.findOne({
      where: { email },
    });
    return userByEmail;
  },
  async getUserIdByEmail(email) {
    const { id } = await User.findOne({
      raw: true,
      where: { email },
      attributes: ['id'],
    });
    return id;
  },
  async getById(id) {
    const user = await User.findByPk(id, {
      attributes: {
        exclude: ['password'],
      },
    });
    if (!user) {
      throw new UserNotFound('User does not exist');
    }
    return user;
  },
  async getAll() {
    const users = await User.findAll({
      attributes: {
        exclude: ['password'],
      },
    });
    return users;
  },
  async existsByEmail(email) {
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
  async deleteByEmail(email) {
    await User.destroy({ where: { email } });
  },
};

module.exports = userService;