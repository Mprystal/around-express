const express = require('express');
const fs = require('fs').promises;

const router = express.Router();
const path = require('path');

function getFilePath(file) {
  return fs.readFile(file, { encoding: 'utf-8' }).then(JSON.parse).catch((err) => { console.log(err); throw new Error(err); });
}

router.get('/cards', (req, res) => {
  const fileCardsData = path.join(__dirname, '..', 'data', 'cardsData.json');
  getFilePath(fileCardsData).then((cards) => { res.status(200).send(cards); }).catch(() => res.status(500).send('{ "message": "Sever Error" }'));
});

module.exports = router;
