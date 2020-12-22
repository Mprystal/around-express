const express = require('express');
const fs = require('fs').promises;

const router = express.Router();
const path = require('path');

function getFilePath(file) {
  return fs.readFile(file, { encoding: 'utf-8' }).then(JSON.parse).catch((err) => { console.log(err); throw new Error(err); });
}

router.get('/users', (req, res) => {
  const fileUsersData = path.join(__dirname, '..', 'data', 'usersData.json');

  getFilePath(fileUsersData).then((users) => { res.status(200).send(users); }).catch(() => res.status(500).send('{ "message": "Sever Error" }'));
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
