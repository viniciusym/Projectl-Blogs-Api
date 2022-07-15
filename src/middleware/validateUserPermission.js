const postService = require('../services/postService');
const userService = require('../services/userService');
const validations = require('../services/validations');

const validateUserPermission = async (req, _res, next) => {
  const { id } = req.params;
  const postUserId = await postService.getUserId(id);
  const requestingUserId = await userService.getUserIdByEmail(req.token.data.userEmail);
  await validations.userId(requestingUserId, postUserId);
  next();
};

module.exports = validateUserPermission;