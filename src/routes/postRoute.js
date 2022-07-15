const { Router } = require('express');
const postController = require('../controllers/postController');
const validateToken = require('../middleware/validateToken');

const postRoute = Router();

postRoute.post('/', validateToken, postController.add);
postRoute.get('/:id', validateToken, postController.getById);
postRoute.get('/', validateToken, postController.getAll);

module.exports = postRoute;