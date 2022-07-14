const Joi = require('joi');
const InvalidFieldsError = require('../errors/InvalidFieldsError');
const MissingFieldsError = require('../errors/MissingFieldsError');

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
  async password(signedUserPassword, userToValidate) {
    const isPasswordValid = signedUserPassword.password === userToValidate.password;
    if (!isPasswordValid) {
      throw new InvalidFieldsError('Invalid fields');
    }
  },
};

module.exports = validations;