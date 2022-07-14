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

const updatePlayerData = async () => {
  for (let player of players) {
    console.info(`updating data of ${player.USERNAME}`);
    const updatedData = await service.getRankedData(player.USERNAME);

    const wr = Math.round(
      (100 / (updatedData.wins + updatedData.losses)) * updatedData.wins
    );

    const progress = utils.calculateProgress(updatedData, player);

    let lpForRankUp;
    if(updatedData.tier === 'GRANDMASTER') {
      lpForRankUp = (await service.getChallengerLP()) - updatedData.leaguePoints;
    } else {
      lpForRankUp = (await service.getGrandmasterLP()) - updatedData.leaguePoints;
    }

    const existingData = await db.getPlayerDataByPlayer(player.USERNAME);
    if (existingData === undefined || existingData.length === 0) {
      await db.setPlayerData(
        player.USERNAME,
        updatedData.tier,
        updatedData.rank,
        updatedData.leaguePoints,
        wr,
        progress,
        lpForRankUp
      );
    } else {
      await db.updatePlayerData(
        player.USERNAME,
        updatedData.tier,
        updatedData.rank,
        updatedData.leaguePoints,
        wr,
        progress,
        lpForRankUp
      );
    }
  }
};

updatePlayerData();
