const { Router } = require('express');
const userController = require('../controllers/userController');
const validateToken = require('../middleware/validateToken');

const userRoute = Router();

userRoute.get('/', validateToken, userController.getAll);
userRoute.post('/', userController.add);

module.exports = userRoute;