const { Router } = require('express');
const postController = require('../controllers/postController');
const checkIfPostExists = require('../middleware/checkIfPostExists');
const validateToken = require('../middleware/validateToken');
const validateUserPermission = require('../middleware/validateUserPermission');

const postRoute = Router();

postRoute
  .get('/search', validateToken, postController.getBySearchTerm);
postRoute
  .post('/', validateToken, postController.add);
postRoute
  .put('/:id', validateToken, validateUserPermission, postController.update);
postRoute
  .delete('/:id', checkIfPostExists, validateToken, validateUserPermission, postController.delete);
postRoute
  .get('/:id', checkIfPostExists, validateToken, postController.getById);
postRoute
  .get('/', validateToken, postController.getAll);

module.exports = postRoute;