const User = require('../models/user.js');

const getUsers = (req, res) => {
  User.find({}).then((users) => { res.status(200).send(users); }).catch(() => res.status(500).send({ message: 'Sever Error' }));
};

const getUsersById = (req, res) => {
  User.find({ _id: req.params.id })
    .then((user) => {
      if (user) {
        return res.status(200).send(user);
      }
      return res.status(404).send({ message: 'User ID not found' });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar }).then((user) => { res.status(200).send(user); })
    .catch(() => res.status(400).send({ message: 'User cannot be created' }));
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((profile) => res.send({ data: profile }))
    .catch(() => res.status(400).send({ message: 'User cannot be patched' }));
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((userAvatar) => res.send({ data: userAvatar }))
    .catch(() => res.status(400).send({ message: 'User cannot be patched' }));
};

module.exports = {
  getUsers, getUsersById, createUser, updateProfile, updateAvatar,
};
