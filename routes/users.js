const router = require("express").Router();

const {
  getUser,
  getUsers,
  createUser,
  updateUser,
  updateAvatar,
} = require("../controllers/users");

router.get("/:id", getUser);
router.get("/", getUsers);
router.get("/", createUser);
router.get("/me", updateUser);
router.get("/me/avatar", updateAvatar);

module.exports = router;