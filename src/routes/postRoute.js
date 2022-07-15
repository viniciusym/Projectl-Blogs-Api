const { Router } = require('express');
const postController = require('../controllers/postController');
const validateToken = require('../middleware/validateToken');

const postRoute = Router();

postRoute.post('/', validateToken, postController.add);

module.exports = postRoute;