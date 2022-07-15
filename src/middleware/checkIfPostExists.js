const postService = require('../services/postService');

const checkIfPostExists = async (req, _res, next) => {
  await postService.exists(req.params.id);
  next();
};

module.exports = checkIfPostExists;