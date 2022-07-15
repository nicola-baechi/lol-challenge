const db = require('../services/db.service');
const service = require('../services/player.service');

const updateMostPlayed = async () => {
  const userToUpdate = await db.getOldestPlayerTimestamp();

  const updated = await service.updateMostPlayed(userToUpdate);

  await db.updateMostPlayed(userToUpdate, updated);
};

updateMostPlayed();
