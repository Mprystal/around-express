const express = require('express');
const fs = require('fs').promises;

const router = express.Router();
const path = require('path');

function getFilePath(file) {
  return fs.readFile(file, { encoding: 'utf-8' }).then(JSON.parse).catch(() => '{ "message": "Server Error" }');
  //I dont know how to send a status code in a catch.. Everything online is using console.log that I can find. Getting no help with this as well.
}

router.get('/cards', (req, res) => {
  const fileCardsData = path.join(__dirname, '..', 'data', 'cardsData.json');
  getFilePath(fileCardsData).then((cards) => { res.send(cards); });
});

module.exports = router;
