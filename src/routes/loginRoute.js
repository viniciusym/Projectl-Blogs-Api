const { Router } = require('express');
const authController = require('../controllers/ authController');

const loginRoute = Router();

loginRoute.post('/', authController.login);

module.exports = loginRoute;