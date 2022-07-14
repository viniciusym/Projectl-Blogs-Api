class InvalidFieldsError extends Error {
  constructor(message) {
    super(message);

    this.name = 'InvalidFieldsError';
  }
}

module.exports = InvalidFieldsError;