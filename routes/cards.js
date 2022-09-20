const router = require("express").Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

router.get("/", getCards);
router.get("/", createCard);
router.get("/:cardId", deleteCard);
router.get("/cardId/likes", likeCard);
router.get("/cardId/likes", dislikeCard);

module.exports = router;