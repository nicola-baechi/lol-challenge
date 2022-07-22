const { client } = require('../config/db.config');

const getPlayers = async () => {
  try {
    const result = await client.query(`SELECT * FROM PLAYERS`);
    return result.rows;
  } catch (e) {
    return console.error(e.stack);
  }
};

const getPlayerByUsername = async (username) => {
  try {
    const result = await client.query(
      `SELECT * FROM players WHERE username = $1`,
      [username]
    );
    return result.rows[0];
  } catch (e) {
    return console.error(e.stack);
  }
};

const createPlayer = (
  username,
  name,
  tier,
  rank,
  lp,
  wr,
  progress,
  lpToUprank
) => {
  client.query(
    `INSERT INTO players (username, name,  tier, p_rank, lp, wr, progress, lp_to_uprank) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    [username, name, tier, rank, lp, wr, progress, lpToUprank],
    (error, results) => {
      if (error) {
        throw error;
      } else {
        console.info(`player ${username} successfully created`);
      }
    }
  );
};

const updatePlayer = (username, data) => {
  const { tier, rank, lp, wr, progress, lpToUprank } = data;

  client.query(
    `UPDATE players SET tier = $1, p_rank = $2, lp = $3, wr = $4, progress = $5, lp_to_uprank = $6 WHERE username = $7`,
    [tier, rank, lp, wr, progress, lpToUprank, username],
    (error, results) => {
      if (error) {
        throw error;
      } else {
        console.info(`player ${username} successfully updated`);
      }
    }
  );
};

const createChampions = async (username, champions) => {
  const id = await getIdByUsername(username);

  for (const champion of champions) {
    client.query(
      `INSERT INTO champions (player, champion, games, 
        wins, losses, kills, deaths, assists) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        id,
        champion.champion,
        champion.games,
        champion.wins,
        champion.losses,
        champion.kills,
        champion.deaths,
        champion.assists,
      ],
      (error, results) => {
        if (error) {
          throw error;
        } else {
          console.info(
            `champion ${champion.champion} of ${username} successfully created`
          );
        }
      }
    );
  }
  updateTimestamp(username);
};

const updateChampions = async (username, champions) => {
  const id = await getIdByUsername(username);

  const ids = await getChampionIdsByPlayer(id);

  for (const [index, _id] of ids.entries()) {
    const champion = champions[index];

    client.query(
      `UPDATE champions SET champion = $1, games = $2, wins = $3, 
      losses = $4, kills = $5, deaths = $6, assists = $7
      WHERE player = $8 AND id = $9`,
      [
        champion.champion,
        champion.games,
        champion.wins,
        champion.losses,
        champion.kills,
        champion.deaths,
        champion.assists,
        id,
        _id.id,
      ],
      (error, results) => {
        if (error) {
          throw error;
        } else {
          console.info(
            `champion ${champion.champion} of ${username} successfully updated`
          );
        }
      }
    );
  }
  updateTimestamp(username);
};

const getChampionsByPlayer = async (username) => {
  const id = await getIdByUsername(username);

  const result = await client.query(
    `SELECT * FROM champions WHERE player = $1`,
    [id]
  );
  return result.rows;
};

const getIdByUsername = async (username) => {
  try {
    const result = await client.query(
      `SELECT id FROM players WHERE username = $1`,
      [username]
    );
    return result.rows[0].id;
  } catch (e) {
    return console.error(e.stack);
  }
};

const getChampionIdsByPlayer = async (player) => {
  try {
    const result = await client.query(
      `SELECT id FROM champions WHERE player = $1`,
      [player]
    );
    return result.rows;
  } catch (e) {
    return console.error(e.stack);
  }
};

const updateGamesByUsername = async (username, games) => {
  client.query(
    `UPDATE players SET games = $1 WHERE username = $2`,
    [games, username],
    (error, results) => {
      if (error) {
        throw error;
      } else {
        console.info(`games of ${username} successfully updated to ${games}`);
      }
    }
  );
};

const updateWinsByUsername = async (username, wins) => {
  client.query(
    `UPDATE players SET wins = $1 WHERE username = $2`,
    [wins, username],
    (error, results) => {
      if (error) {
        throw error;
      } else {
        console.info(`wins of ${username} successfully updated to ${wins}`);
      }
    }
  );
};

const updateLossesByUsername = async (username, losses) => {
  client.query(
    `UPDATE players SET losses = $1 WHERE username = $2`,
    [losses, username],
    (error, results) => {
      if (error) {
        throw error;
      } else {
        console.info(`losses of ${username} successfully updated to ${losses}`);
      }
    }
  );
};

const getOldestPlayerTimestamp = async () => {
  const players = await getPlayers();
  const today = new Date();
  let times = [];

  for (const player of players) {
    const lastUpdated = new Date(Date.parse(player.mp_updated));
    times.push({
      username: player.username,
      timestamp: Math.abs(today - lastUpdated),
    });
  }

  const oldest = times.reduce((a, b) => (a.timestamp > b.timestamp ? a : b));
  return oldest.username;
};

const updateTimestamp = async (username) => {
  const id = await getIdByUsername(username);

  const date = new Date().toISOString().slice(0, 19).replace('T', ' ');

  client.query(
    `UPDATE players SET mp_updated = $1 WHERE id = $2`,
    [date, id],
    (error, results) => {
      if (error) {
        throw error;
      } else {
        console.info(
          `timestamp of ${username} successfully updated to ${date}`
        );
      }
    }
  );
};

module.exports = {
  getPlayers,
  getPlayerByUsername,
  getIdByUsername,
  getChampionsByPlayer,
  updateGamesByUsername,
  updateWinsByUsername,
  updateLossesByUsername,
  getOldestPlayerTimestamp,
  createPlayer,
  updatePlayer,
  createChampions,
  updateChampions,
};
