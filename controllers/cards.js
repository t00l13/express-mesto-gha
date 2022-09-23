const Card = require('../models/card');
const { NotFoundError } = require('../errors/errors');

const ERROR_CODE = 400;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

module.exports.getCards = async (req, res) => {
  try {
    const users = await Card.find({});
    res.send({ data: users });
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка!' });
  }
};

module.exports.createCard = async (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  try {
    const card = await Card.create({ name, link, owner });
    res.send({ data: card });
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

module.exports.deleteCard = async (req, res) => {
  const reqCard = req.params.cardId;
  try {
    const card = await Card.findByIdAndRemove(reqCard).orFail(new NotFoundError());
    res.send({ data: card });
  } catch (err) {
    let code = INTERNAL_SERVER_ERROR;
    let message = 'Произошла ошибка';
    switch (err.name) {
      case 'CastError':
        code = ERROR_CODE;
        message = 'Введены некоррктные данные';
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

module.exports.likeCard = async (req, res) => {
  try {
    const likes = await Card.findByIdAndUpdate(req.params.cardId, {
      $addToSet: { likes: req.user._id },
    }, { new: true }).orFail(new NotFoundError());
    res.send({ data: likes });
  } catch (err) {
    let code = INTERNAL_SERVER_ERROR;
    let message = 'Произошла ошибка';
    switch (err.name) {
      case 'CastError':
        code = ERROR_CODE;
        message = 'Введены некоррктные данные';
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

module.exports.dislikeCard = async (req, res) => {
  try {
    const likes = await Card.findByIdAndUpdate(req.params.cardId, {
      $pull: { likes: req.user._id },
    }, { new: true }).orFail(new NotFoundError());
    res.send({ data: likes });
  } catch (err) {
    let code = INTERNAL_SERVER_ERROR;
    let message = 'Произошла ошибка';
    switch (err.name) {
      case 'CastError':
        code = ERROR_CODE;
        message = 'Введены некоррктные данные';
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
