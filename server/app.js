const express = require('express');
const cors = require('cors');
const db = require('./services/db.service');

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
    const mostPlayed = await db.getMostPlayedByPlayer(player.username);
    final.push({ ...player, mostPlayed });
  }

  response.status(200).json(final);
};

app.route('/players').get(getPlayers);

app.listen(
  process.env.PORT || 8080,
  process.env.NODE_ENV === 'development' ? undefined : host,
  () => {
    console.log(`app listening on port ${port}`);
  }
);
