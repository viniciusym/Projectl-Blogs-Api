const errorsStatus = {
  MissingFieldsError: 400,
  InvalidFieldsError: 400,
  ValidationError: 400,
  UserAlreadyExistsError: 409,
};

const errorHandler = (err, _req, res, _next) => {
  const { name, message } = err;
  if (errorsStatus[name]) {
    return res.status(errorsStatus[name]).json({ message });
  }
  res.status(500).json({ message });
};

module.exports = errorHandler;