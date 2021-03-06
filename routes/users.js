const express = require('express');

const router = express.Router();
const {
  getUsers, getUsersById, createUser, updateProfile, updateAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:id', getUsersById);
router.post('/users', createUser);
router.patch('/users/me', updateProfile);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
