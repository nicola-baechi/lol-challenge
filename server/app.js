const express = require('express');
const service = require('./services/player.service');
const cron = require('node-cron');
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
let player = players[3];

const app = express();
const host = '0.0.0.0';
const port = 8080;

app.listen(process.env.PORT || 8080, host, () => {
  console.log(`app listening on port ${port} KEY ${process.env.API_KEY}`);
});

app.route('/players').get(async function (req, res) {
  let data = [];
  for (let player of players) {
    const response = await service.buildData(player);
    data.push(response);
  }
  data = utils.calculateRanking(data);

  const grandmasters = await service.getGrandmasterLP();
  console.log(grandmasters);

  res.send(data);
});

cron.schedule('* * * * *', async function () {
  await service.updateMostPlayed(player.USERNAME);
  const updated = await db.getEntriesByPlayer(player.USERNAME);
  console.log(`${updated} most played of ${player.USERNAME}`);
  // if player is last of players array
  if (player.USERNAME === players[players.length - 1].USERNAME) {
    player = players[0];
  } else {
    player = players[players.indexOf(player) + 1];
  }
});
