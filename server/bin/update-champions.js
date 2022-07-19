const db = require('../services/db.service');
const service = require('../services/player.service');

const updateMostPlayed = async () => {
  const userToUpdate = await db.getOldestPlayerTimestamp();

  const updated = await service.updateMostPlayed('VININE Philly');

  await db.updateMostPlayed('VININE Philly', updated);
};

updateMostPlayed();
