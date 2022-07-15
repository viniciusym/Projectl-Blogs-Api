class CategoryIdsNotFoundError extends Error {
  constructor(message) {
    super(message);

    this.name = 'CategoryIdsNotFoundError';
  }
}

module.exports = CategoryIdsNotFoundError;