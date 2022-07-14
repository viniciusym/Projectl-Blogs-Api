const { Category } = require('../database/models');

const categoryService = {
  async add(newCategory) {
    const createResponse = await Category.create(newCategory);

    return createResponse;
  },
  async getAll() {
    const categories = await Category.findAll();

    return categories;
  },
};

module.exports = categoryService;