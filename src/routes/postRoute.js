const { Router } = require('express');
const postController = require('../controllers/postController');
const validateToken = require('../middleware/validateToken');
const validateUserPermission = require('../middleware/validateUserPermission');

const postRoute = Router();

postRoute.post('/', validateToken, postController.add);
postRoute.put('/:id', validateToken, validateUserPermission, postController.update);
postRoute.get('/:id', validateToken, postController.getById);
postRoute.get('/', validateToken, postController.getAll);

module.exports = postRoute;