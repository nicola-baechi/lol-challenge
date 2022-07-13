const {
  BASE_URL,
  RANK_API,
  ACCOUNT_API,
  MATCHES_API,
  MATCHES_PARAMS,
} = require('../constants/api');
const fetch = require('node-fetch');
require('dotenv').config();
const db = require('./db.service');
const utils = require('../utils/player.utils');

const buildData = async (playerStartData) => {
  const updatedData = await getRankedData(playerStartData.USERNAME);

  if (!updatedData) {
    return 'player not found';
  }

  const wr = Math.round(
    (100 / (updatedData.wins + updatedData.losses)) * updatedData.wins
  );

  const progress = utils.calculateProgress(updatedData, playerStartData);
  const mostPlayed = await db.getEntriesByPlayer(playerStartData.USERNAME);

  const lpToGM = (await getGrandmasterLP()) - updatedData.leaguePoints;

  const response = {
    name: playerStartData.NAME,
    username: playerStartData.USERNAME,
    tier: updatedData.tier,
    rank: updatedData.rank,
    lp: updatedData.leaguePoints,
    startlp: playerStartData.LP,
    wr: wr,
    lpToGM: lpToGM,
    progress: progress,
    mostPlayed: JSON.parse(mostPlayed),
  };

  return response;
};

const getRankedData = async (username) => {
  const accountId = await getAccountId(username);
  console.log(`accountID: ${accountId}`);
  const url = `${BASE_URL}${RANK_API}${accountId}?api_key=${process.env.API_KEY}`;
  console.log(`URL: ${url}`);
  const response = fetch(url)
    .then((res) => res.json())
    .then((json) => {
      return json.find((rank) => rank.queueType === 'RANKED_SOLO_5x5');
    });
  return response;
};

const updateMostPlayed = async (username) => {
  const updatedChampions = await getChampionData(username);
  const existingChampions = await db.getEntriesByPlayer(username);
  if (existingChampions?.length === 0) {
    return await db.setChampionsByPlayer(username, updatedChampions);
  } else {
    return await db.updateChampionsByPlayer(username, updatedChampions);
  }
};

const getChampionData = async (username) => {
  const puuid = await getPuuid(username);
  const matches = await getMatchesByPuuid(puuid);
  let champions = [];
  for (let matchId of matches) {
    const match = await getMatchInfo(matchId);
    const player = match.info.participants.find(
      (participant) => participant.puuid === puuid
    );
    champions.push(player.championName);
  }

  const mostPlayed = utils.getMostPlayedChampions(champions);

  return mostPlayed;
};

const getMatchInfo = async (matchId) => {
  const url = `${MATCHES_API}${matchId}?api_key=${process.env.API_KEY}`;
  const res = await fetch(url);
  const json = await res.json();
  return json;
};

const getMatchesByPuuid = async (puuid) => {
  const url = `${MATCHES_API}by-puuid/${puuid}${MATCHES_PARAMS}&api_key=${process.env.API_KEY}`;
  return fetch(url)
    .then((res) => res.json())
    .then((json) => {
      return json;
    });
};

const getGrandmasterLP = async () => {
  const url = `${BASE_URL}league/v4/grandmasterleagues/by-queue/RANKED_SOLO_5x5?api_key=${process.env.API_KEY}`;
  const res = await fetch(url);
  const json = await res.json();
  const grandmasters = json.entries;

  const sortedGrandmasters = grandmasters.sort(
    (a, b) => a.leaguePoints - b.leaguePoints
  );

  return sortedGrandmasters[41].leaguePoints;
};

const getPuuid = async (username) => {
  const account = await getAccount(username);
  return account.puuid;
};

const getAccountId = async (username) => {
  const account = await getAccount(username);
  return account.id;
};

const getAccount = async (username) => {
  const url = `${BASE_URL}${ACCOUNT_API}${username}?api_key=${process.env.API_KEY}`;
  console.log(`ACCOUNT URL: ${url}`);

  const res = await fetch(url);
  const json = await res.json();

  return json;
};

module.exports = {
  updateMostPlayed: updateMostPlayed,
  buildData: buildData,
  getChampionData: getChampionData,
  getPuuid: getPuuid,
  getGrandmasterLP: getGrandmasterLP,
};
