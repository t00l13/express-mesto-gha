const router = require('express').Router();
const {
  validationIdUser,
  validationUpdateAvatar,
  validationUpdateUser,
} = require('../middlewares/validation');

const {
  getUser,
  getUsers,
  createUser,
  updateUser,
  updateAvatar,
  getUserMe,
} = require('../controllers/users');

router.get('/me', getUserMe);
router.get('/:userId', validationIdUser, getUser);
router.get('/', getUsers);
router.post('/', createUser);
router.patch('/me', validationUpdateUser, updateUser);
router.patch('/me/avatar', validationUpdateAvatar, updateAvatar);

module.exports = router;
