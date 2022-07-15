const { Op } = require('sequelize');
const { Category } = require('../database/models');
const CategoryIdsNotFoundError = require('../errors/CategoryIdsNotFoundError');

const categoryService = {
  async add(newCategory) {
    const createResponse = await Category.create(newCategory);

    return createResponse;
  },
  async getAll() {
    const categories = await Category.findAll();

    return categories;
  },
  async categoriesExists(categoryIds) {
    const foundCategories = await Category.findAll({
      raw: true,
      attributes: ['id'],
      where: {
        id: { [Op.or]: categoryIds },
    } });
    if (foundCategories.length !== categoryIds.length) {
      throw new CategoryIdsNotFoundError('"categoryIds" not found');
    }
  },
};

module.exports = categoryService;