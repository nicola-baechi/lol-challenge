// DB CONFIG
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('champions.db');

const query = (command, method = 'all') => {
  return new Promise((resolve, reject) => {
    db[method](command, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

const initialize = async () => {
  db.serialize(async () => {
    await query(
      'CREATE TABLE IF NOT EXISTS champions (player text, champions text)',
      'run'
    );
  });
};

const getAllEntries = async () => {
  const entries = await query('SELECT * FROM champions', 'run');
  return entries;
};

const getEntriesByPlayer = async (player) => {
  const entries = await query(
    `SELECT champions FROM champions WHERE player = '${player}'`
  );

  if (entries !== undefined && entries.length > 0) {
    const champions = entries[0].champions;
    return champions;
  } else {
    return entries;
  }
};

const setChampionsByPlayer = async (player, champions) => {
  const entries = await query(
    `INSERT INTO champions (player, champions) VALUES ('${player}', '${JSON.stringify(
      champions
    )}')`,
    'run'
  );
  if (entries !== undefined) {
    const response = entries[0].champions;
    return response;
  } else {
    return entries;
  }
};

const updateChampionsByPlayer = async (player, champions) => {
  const entries = await query(
    `UPDATE champions SET champions = '${JSON.stringify(
      champions
    )}' WHERE player = '${player}'`,
    'run'
  );
  if (entries !== undefined) {
    const response = entries[0].champions;
    return response;
  } else {
    return entries;
  }
};

const clearDatabase = async () => {
  await query('DELETE FROM champions');
};

module.exports = {
  getAllEntries: getAllEntries,
  initialize: initialize,
  getEntriesByPlayer: getEntriesByPlayer,
  setChampionsByPlayer: setChampionsByPlayer,
  updateChampionsByPlayer: updateChampionsByPlayer,
  clearDatabase: clearDatabase,
};
