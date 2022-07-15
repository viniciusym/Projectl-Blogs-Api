const errorsStatus = {
  MissingFieldsError: 400,
  InvalidFieldsError: 400,
  ValidationError: 400,
  UserAlreadyExistsError: 409,
  JsonWebTokenError: 401,
  UserNotFound: 404,
  CategoryIdsNotFoundError: 400,
};

const errorsMessages = {
  JsonWebTokenError: 'Expired or invalid token',
};

const errorHandler = (err, _req, res, _next) => {
  const { name, message } = err;
  if (errorsStatus[name]) {
    return res.status(errorsStatus[name]).json({ message: errorsMessages[name] || message });
  }
  res.status(500).json({ message });
};

module.exports = errorHandler;