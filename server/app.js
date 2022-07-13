const express = require('express');
const utils = require('./utils/player.utils');

const {
  BLADESHOW,
  AUTOPHIL,
  SHANTAO,
  SOLA,
  KUTCHER,
} = require('./constants/start');
const db = require('./services/db.service');

// todo - add a cron job to update the most played champions
// todo - check why it doesnt work for the other players
const players = [BLADESHOW, AUTOPHIL, SHANTAO, SOLA, KUTCHER];

const app = express();
const host = '0.0.0.0';
const port = 8080;

app.listen(process.env.PORT || 8080, host, () => {
  console.log(`app listening on port ${port}`);
});

app.route('/players').get(async function (req, res) {
  db.initialize();

  const playerDatas = await db.getAllPlayerData();
  console.log(`playerData: ${playerDatas}`);

  const champs = await db.getAllEntries();
  console.log('champs', champs);

  let data = [];
  for (let player of players) {
    const playerData = await db.getPlayerDataByPlayer(player.USERNAME);
    data.push(playerData);
  }
  data = utils.calculateRanking(data);

  res.send(data);
});
