const { ERROR_DEFAULT } = require('../utils/errors');

const errorHandler = (err, req, res, next) => {
  // константа статуса ошибки
  const statusCode = err.statusCode || ERROR_DEFAULT;
  // константа сообщения при 500(ошибка сервера)
  const message = statusCode === ERROR_DEFAULT ? 'На сервере произошла ошибка' : err.message;
  console.log(err);
  res.status(statusCode).send({ message });
  next();
};

module.exports = errorHandler;
