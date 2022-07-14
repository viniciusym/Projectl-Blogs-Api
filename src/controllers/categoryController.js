const categoryService = require('../services/categoryService');
const validations = require('../services/validations');

const categoryController = {
  async add(req, res) {
    await validations.newCategory(req.body);
    const newCategory = await categoryService.add(req.body);

    res.status(201).json(newCategory);
  },
  async getAll(_req, res) {
    const categories = await categoryService.getAll();

    res.status(200).json(categories);
  },
};

module.exports = categoryController;