class PostNotFoundError extends Error {
  constructor(message) {
    super(message);

    this.name = 'PostNotFoundError';
  }
}

module.exports = PostNotFoundError;