const router = require('express').Router();
const { validationCard, validationIdCard } = require('../middlewares/validation');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', validationCard, createCard);
router.delete('/:cardId', validationIdCard, deleteCard);
router.put('/:cardId/likes', validationIdCard, likeCard);
router.delete('/:cardId/likes', validationIdCard, dislikeCard);

module.exports = router;
