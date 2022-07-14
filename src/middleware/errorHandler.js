const errorsStatus = {
  MissingFieldsError: 400,
  InvalidFieldsError: 400,
};

const errorHandler = (err, _req, res, _next) => {
  const { name, message } = err;
  if (errorsStatus[name]) {
    res.status(errorsStatus[name]).json({ message });
  }
};

module.exports = errorHandler;