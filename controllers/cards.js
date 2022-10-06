const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

// получение карточек
const getCards = (req, res, next) => Card
  .find({})
  .populate('owner')
  .then((cards) => res.status(200).send(cards))
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new BadRequestError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
    } else next(err);
  });
// удаление карточки
const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(new NotFoundError('Карточки не существует'))
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        next(new ForbiddenError('Недостаточно прав для выполнения операции'));
      }
      Card.findByIdAndDelete(req.params.cardId)
        .then(() => res.status(200).send(card))
        .catch(next);
    })
    .catch(next);
};
// создание карточки
const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card
    .create({ name, link, owner: req.user._id })
    .then((card) => {
      card.populate('owner').execPopulate()
        .then((populatedCard) => {
          res.send(populatedCard);
        });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
      } else next(err);
    });
};
// лайк карточки
const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    // добавление айдишника в массив, если такого не существует
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Карточка не найдена'));
      }
      card.populate('owner').execPopulate()
        .then((populatedCard) => {
          res.send(populatedCard);
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
      } else if (err.message === 'NotFound') {
        next(new NotFoundError('Передан несуществующий _id карточки.'));
      } else next(err);
    });
};
// удалить лайк с карточки
const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    // убрать айдишник из массива
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new NotFoundError('Карточка не найдена'))
    .then((card) => card.populate('owner').execPopulate()
      .then((populatedCard) => {
        res.send(populatedCard);
      }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
      } else next(err);
    });
};

module.exports = {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
};
