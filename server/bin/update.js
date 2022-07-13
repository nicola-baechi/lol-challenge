const {
  BLADESHOW,
  AUTOPHIL,
  SHANTAO,
  SOLA,
  KUTCHER,
} = require('./constants/start');

const db = require('./services/db.service');
const service = require('./services/player.service');

const players = [BLADESHOW, AUTOPHIL, SHANTAO, SOLA, KUTCHER];
let player = players[0];

const updateMostPlayed = async () => {
  await service.updateMostPlayed(player.USERNAME);
  const updated = await db.getEntriesByPlayer(player.USERNAME);
  console.log(`${updated} most played of ${player.USERNAME}`);
  // if player is last of players array
  if (player.USERNAME === players[players.length - 1].USERNAME) {
    player = players[0];
  } else {
    player = players[players.indexOf(player) + 1];
  }
};

updateMostPlayed();
