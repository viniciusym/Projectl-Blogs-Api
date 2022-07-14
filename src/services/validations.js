const InvalidFieldsError = require('../errors/InvalidFieldsError');
const MissingFieldsError = require('../errors/MissingFieldsError');

const validations = {
  async loginPayload(unknown) {
    if (!unknown.email || !unknown.password) {
      throw new MissingFieldsError('Some required fields are missing');
    }
  },
  async password(signedUserPassword, userToValidate) {
    const isPasswordValid = signedUserPassword.password === userToValidate.password;
    if (!isPasswordValid) {
      throw new InvalidFieldsError('Invalid fields');
    }
  },
};

module.exports = validations;