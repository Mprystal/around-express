const express = require('express');
const fs = require('fs').promises;

const router = express.Router();
const path = require('path');

function getFilePath(file) {
  return fs.readFile(file, { encoding: 'utf-8' }).then(JSON.parse).catch(() => '{ "message": "Server Error" }');
  //I dont know how to send a status code in a catch.. Everything online is using console.log that I can find. Getting no help with this as well.
}

router.get('/users', (req, res) => {
  const fileUsersData = path.join(__dirname, '..', 'data', 'usersDatl.json');

  getFilePath(fileUsersData).then((users) => { res.send(users); });
});

router.get('/users/:id', (req, res) => {
  const fileUsersData = path.join(__dirname, '..', 'data', 'usersData.json');

  getFilePath(fileUsersData)
    .then((users) => {
      const aUser = users.find((user) => user._id === req.params.id);

      if (aUser) {
        return res.send(aUser);
      }
      return res.status(404).send('{ "message": "User ID not found" }');
    });
});
module.exports = router;
