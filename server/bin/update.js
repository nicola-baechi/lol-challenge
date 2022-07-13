const {
  BLADESHOW,
  AUTOPHIL,
  SHANTAO,
  SOLA,
  KUTCHER,
} = require('../constants/start');

const db = require('../services/db.service');
const service = require('../services/player.service');
const utils = require('../utils/player.utils');

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

const updatePlayerData = async () => {
  for (let player of players) {
    console.info(`updating data of ${player.USERNAME}`);
    const updatedData = await service.getRankedData(player.USERNAME);

    const wr = Math.round(
      (100 / (updatedData.wins + updatedData.losses)) * updatedData.wins
    );

    const progress = utils.calculateProgress(updatedData, player);
    const lpToGM =
      (await service.getGrandmasterLP()) - updatedData.leaguePoints;

    const existingData = await db.getPlayerDataByPlayer(player.USERNAME);
    if (existingData === undefined || existingData.length === 0) {
      await db.setPlayerData(
        player.USERNAME,
        updatedData.tier,
        updatedData.rank,
        updatedData.leaguePoints,
        wr,
        progress,
        lpToGM
      );
    } else {
      await db.updatePlayerData(
        player.USERNAME,
        updatedData.tier,
        updatedData.rank,
        updatedData.leaguePoints,
        wr,
        progress,
        lpToGM
      );
    }
  }
};

updateMostPlayed();
updatePlayerData();
