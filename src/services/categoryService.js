const { Category } = require('../database/models');

const categoryService = {
  async add(newCategory) {
    const createResponse = await Category.create(newCategory);

    return createResponse;
  },
};

module.exports = categoryService;