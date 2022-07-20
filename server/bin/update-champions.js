const db = require('../services/db.service');
const service = require('../services/player.service');

const updateMostPlayed = async () => {
  const userToUpdate = await db.getOldestPlayerTimestamp();

  const updated = await service.updateMostPlayed(userToUpdate);

  console.info(`updating champions of player ${updated}`);

  await db.updateMostPlayed(userToUpdate, updated);
};

updateMostPlayed();
