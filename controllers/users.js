const User = require('../models/user');
const { NotFoundError } = require('../errors/errors');

const ERROR_CODE = 400;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

module.exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send({ data: users });
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка!' });
  }
};

module.exports.getUser = async (req, res) => {
  const reqUser = req.params.id;
  try {
    const user = await User.findById(reqUser).orFail(new NotFoundError());
    res.send({ data: user });
  } catch (err) {
    let code = INTERNAL_SERVER_ERROR;
    let message = 'Произошла ошибка';
    switch (err.name) {
      case 'CastError':
        code = ERROR_CODE;
        message = 'Введены некорректные данные';
        break;

      case 'NotFoundError':
        code = NOT_FOUND;
        message = 'Данные не найдены';
        break;
        // no default
    }
    res.status(code).send({ message });
  }
};

module.exports.createUser = async (req, res) => {
  const { name, about, avatar } = req.body;

  try {
    const user = await User.create({ name, about, avatar });
    res.send({ data: user });
  } catch (err) {
    let code = INTERNAL_SERVER_ERROR;
    let message = 'Произошла ошибка';
    switch (err.name) {
      case 'ValidationError':
        code = ERROR_CODE;
        message = 'Введены некорректные данные';
        break;
        // no default
    }
    res.status(code).send({ message });
  }
};

module.exports.updateUser = async (req, res) => {
  const { name, about } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      {
        new: true,
        runValidators: true,
      },
    ).orFail(new NotFoundError());
    res.send({ data: user });
  } catch (err) {
    let code = INTERNAL_SERVER_ERROR;
    let message = 'Произошла ошибка';
    switch (err.name) {
      case 'CastError':
        code = ERROR_CODE;
        message = 'Введены некорректные данные';
        break;

      case 'NotFoundError':
        code = NOT_FOUND;
        message = 'Данные не найдены';
        break;
        // no default
    }
    res.status(code).send({ message });
  }
};

module.exports.updateAvatar = async (req, res) => {
  const { avatar } = req.body;
  try {
    const updateAvatar = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      {
        new: true,
        runValidators: true,
      },
    ).orFail(new NotFoundError());
    res.send({ data: updateAvatar });
  } catch (err) {
    let code = INTERNAL_SERVER_ERROR;
    let message = 'Произошла ошибка';
    switch (err.name) {
      case 'CastError':
        code = ERROR_CODE;
        message = 'Введены некорректные данные';
        break;

      case 'NotFoundError':
        code = NOT_FOUND;
        message = 'Данные не найдены';
        break;
        // no default
    }
    res.status(code).send({ message });
  }
};
