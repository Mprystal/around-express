const express = require('express');
const fs = require('fs').promises;

const router = express.Router();
const path = require('path');

function getFilePath(file) {
  return fs.readFile(file, { encoding: 'utf-8' }).then(JSON.parse).catch(console.log('error'));
}

router.get('/cards', (req, res) => {
  const fileCardsData = path.join(__dirname, '..', 'data', 'cardsData.json');
  getFilePath(fileCardsData).then((cards) => { res.send(cards); });
});

module.exports = router;
