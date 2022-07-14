const { Router } = require('express');
const categoryController = require('../controllers/categoryController');
const validateToken = require('../middleware/validateToken');

const categoryRoute = Router();

categoryRoute.post('/', validateToken, categoryController.add);
categoryRoute.get('/', validateToken, categoryController.getAll);

module.exports = categoryRoute;