const express = require('express');
const utils = require('./utils/player.utils');
const service = require('./services/player.service');

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

if (process.env.NODE_ENV !== 'development') {
  // disable all console logs
  console.log = function () {};
}

app.listen(
  process.env.PORT || 8080,
  process.env.NODE_ENV === 'development' ? undefined : host,
  () => {
    console.log(`app listening on port ${port}`);
  }
);
app.route('/players').get(async function (req, res) {
  db.initialize();

  const gm = await service.getGrandmasterLP();
  console.log('GM LP', gm);

  let data = [];
  for (let player of players) {
    const playerData = await db.getPlayerDataByPlayer(player.USERNAME);
    const championData = JSON.parse(
      await db.getEntriesByPlayer(player.USERNAME)
    );

    console.log(await service.getChallengerLP());

    const merged = {
      name: player.NAME,
      ...playerData,
      mostPlayed: championData,
    };
    data.push(merged);
  }
  data = utils.calculateRanking(data);

  res.send(data);
});
