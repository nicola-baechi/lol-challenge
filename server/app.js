const express = require('express');
const cors = require('cors');
const db = require('./services/db.service');
const utils = require('./utils/player.utils');

const app = express();
app.use(cors());

const host = '0.0.0.0';
const port = 8080;

if (process.env.NODE_ENV !== 'development') {
  // disable all console logs
  console.log = function () {};
}

const getPlayers = async (request, response) => {
  const players = await db.getPlayers();

  const final = [];
  for (let player of players) {
    const champions = await db.getChampionsByPlayer(player.username);
    const mostPlayed = utils.getMostPlayedChampions(champions);
    final.push({ ...player, mostPlayed: mostPlayed });
  }

  response.status(200).json(utils.calculateRanking(final));
};

const getChampionDataOfPlayer = async (request, response) => {
  const username = request.params.username;
  const champions = await db.getChampionsByPlayer(username);

  // sort champions by games descending
  champions.sort((a, b) => b.games - a.games);

  response.status(200).json(champions);
};

app.route('/players').get(getPlayers);
app.route('/champions/:username').get(getChampionDataOfPlayer);

app.listen(
  process.env.PORT || 8080,
  process.env.NODE_ENV === 'development' ? undefined : host,
  () => {
    console.log(`app listening on port ${port}`);
  }
);
