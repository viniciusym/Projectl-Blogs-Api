const Joi = require('joi');
const InvalidFieldsError = require('../errors/InvalidFieldsError');
const MissingFieldsError = require('../errors/MissingFieldsError');
const UnauthorizedUserError = require('../errors/UnauthorizedUserError');

const validations = {
  async loginPayload(payload) {
    if (!payload.email || !payload.password) {
      throw new MissingFieldsError('Some required fields are missing');
    }
  },
  async newUser(unknown) {
    const schema = Joi.object({
      displayName: Joi.string().min(8).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      image: Joi.string(),
    });

    const userObject = await schema.validateAsync(unknown);
    return userObject;
  },
  async newCategory(unknown) {
    const schema = Joi.object({
      name: Joi.string().required(),
    });

    const categoryObject = await schema.validateAsync(unknown);
    return categoryObject;
  },
  async password(signedUserPassword, userToValidate) {
    const isPasswordValid = signedUserPassword.password === userToValidate.password;
    if (isPasswordValid) return;
  
    throw new InvalidFieldsError('Invalid fields');
  },
  async newPost(post) {
    if (post.title || post.content) return;
  
    throw new MissingFieldsError('Some required fields are missing');
  },
  async newPostCategories(categories) {
    const joiErrorMessage = '"categoryIds" not found';
    const schema = Joi.object({
      categoryIds: Joi.array().min(1).required()
      .messages({
        'array.base': joiErrorMessage,
        'array.min': joiErrorMessage,
        'any.required': joiErrorMessage,
      }),
    });

    await schema.validateAsync(categories);
  },
  async userId(userIdFromPost, userIdFromToken) {
    if (Number(userIdFromPost) === Number(userIdFromToken)) return;

    throw new UnauthorizedUserError('Unauthorized user');
  },
};

module.exports = validations;