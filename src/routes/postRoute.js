const { Router } = require('express');
const postController = require('../controllers/postController');
const validateToken = require('../middleware/validateToken');

const postRoute = Router();

postRoute.post('/', validateToken, postController.add);
postRoute.put('/:id', validateToken, postController.update);
postRoute.get('/:id', validateToken, postController.getById);
postRoute.get('/', validateToken, postController.getAll);

module.exports = postRoute;