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

const getLPForRankUp = async (updatedData) => {
  if (updatedData.tier === 'GRANDMASTER') {
    return (await service.getChallengerLP()) - updatedData.leaguePoints;
  } else {
    return (await service.getGrandmasterLP()) - updatedData.leaguePoints;
  }
};

const updatePlayerData = async () => {
  for (let player of players) {
    console.info(`updating data of ${player.USERNAME}`);
    const updatedData = await service.getRankedData(player.USERNAME);

    const _player = await db.getPlayerByUsername(player.USERNAME);

    const wr = Math.round(
      (100 / (_player.games)) * _player.wins
    );

    const progress = utils.calculateProgress(updatedData, player);
    const lpForRankUp = await getLPForRankUp(updatedData);

    const data = {
      tier: updatedData.tier,
      rank: updatedData.rank,
      lp: updatedData.leaguePoints,
      wr: wr,
      progress: progress,
      lpToUprank: lpForRankUp,
    };

    db.updatePlayer(player.USERNAME, data);
  }
};

updatePlayerData();
