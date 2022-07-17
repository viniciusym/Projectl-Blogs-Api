const postService = require('../services/postService');
const validations = require('../services/validations');

const validateUserPermission = async (req, _res, next) => {
  const { id } = req.params;
  const { userId: requestingUserId } = req.token.data;
  const postUserId = await postService.getUserId(id);
  await validations.userId(requestingUserId, postUserId);
  next();
};

module.exports = validateUserPermission;