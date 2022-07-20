const db = require('../services/db.service');
const service = require('../services/player.service');

const updateChampions = async () => {
  console.time('updateChampions');

  const userToUpdate = await db.getOldestPlayerTimestamp();

  console.log(`userToUpdate: ${userToUpdate}`);
  const updated = await service.updateChampions(userToUpdate);

  console.info(`updating champions of player ${userToUpdate}`);

  await db.updateChampions(userToUpdate, updated);

  console.timeEnd('updateChampions');
};

updateChampions();
