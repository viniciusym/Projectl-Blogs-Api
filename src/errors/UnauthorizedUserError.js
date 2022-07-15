class UnauthorizedUserError extends Error {
  constructor(message) {
    super(message);

    this.name = 'UnauthorizedUserError';
  }
}

module.exports = UnauthorizedUserError;