const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        const regex = /https?:\/\/w?w?w?\.?[-?/a-z0-9_.#@~:!$&'*+,;=()[\]]{1,}\/?#?/i;
        return regex.test(v);
      },
      message: 'You must provide a valid URL for the user avatar',
    },
  },
});

module.exports = mongoose.model('user', userSchema);
