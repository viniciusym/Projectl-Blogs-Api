const categoryService = require('../services/categoryService');
const validations = require('../services/validations');

const categoryController = {
  async add(req, res) {
    await validations.newCategory(req.body);
    const newCategory = await categoryService.add(req.body);

    res.status(201).json(newCategory);
  },
};

module.exports = categoryController;