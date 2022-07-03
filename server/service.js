const { BASE_URL, RANK_API, ACCOUNT_API } = require('./constants/api');
const fetch = require('node-fetch');
require('dotenv').config();

const buildData = async (playerStartData) => {
  const currentRank = await getRankedData(playerStartData.USERNAME);

  if (!currentRank) {
    return 'player not found';
  }

  const wr = Math.round(
    (100 / (currentRank.wins + currentRank.losses)) * currentRank.wins
  );

  const progress = calculateProgress(currentRank, playerStartData);

  const response = {
    name: playerStartData.NAME,
    username: playerStartData.USERNAME,
    tier: currentRank.tier,
    rank: currentRank.rank,
    lp: currentRank.leaguePoints,
    startlp: playerStartData.LP,
    wr: wr,
    progress: progress,
    progressPercent: Math.round((progress / playerStartData.LP) * 100),
  };
  return response;
};

const calculateProgress = (currentRank, playerStartData) => {
  if (currentRank.tier !== 'DIAMOND') {
    return currentRank.leaguePoints - playerStartData.LP;
  } else {
    const temp = 100 - currentRank.leaguePoints;
    return -Math.abs(playerStartData.LP + temp);
  }
};

const getRankedData = async (username) => {
  const accountId = await getAccountId(username);
  const url = `${BASE_URL}${RANK_API}${accountId}?api_key=${process.env.API_KEY}`;
  const response = fetch(url)
    .then((res) => res.json())
    .then((json) => {
      return json.find((rank) => rank.queueType === 'RANKED_SOLO_5x5');
    });
  return response;
};

const getAccountId = async (username) => {
  const url = `${BASE_URL}${ACCOUNT_API}${username}?api_key=${process.env.API_KEY}`;
  const res = await fetch(url);
  const json = await res.json();
  return json.id;
};

module.exports = {
  buildData: buildData,
};
