const {
  BASE_URL,
  RANK_API,
  ACCOUNT_API,
  MATCHES_API,
  MATCHES_PARAMS,
} = require('../constants/api');
const fetch = require('node-fetch');
require('dotenv').config();
const utils = require('../utils/player.utils');

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

const updateMostPlayed = async (username) => {
  const puuid = await getPuuid(username);
  const matches = await getMatchesByPuuid(puuid);
  let champions = [];
  for (let matchId of matches) {
    const match = await getMatchInfo(matchId);
    if (match.hasOwnProperty('status')) {
      if (match.status.status_code === 429) {
        console.error('rate limit exceeded');
      }
    } else {
      const player = match.info.participants.find(
        (participant) => participant.puuid === puuid
      );
      champions.push(player.championName);
    }
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
  const url = `${BASE_URL}league/v4/masterleagues/by-queue/RANKED_SOLO_5x5?api_key=${process.env.API_KEY}`;
  const res = await fetch(url);
  const json = await res.json();
  const masters = json.entries;

  const sortedMasters = masters.sort((a, b) => b.leaguePoints - a.leaguePoints);
  return sortedMasters[20].leaguePoints;
};

const getChallengerLP = async () => {
  const url = `${BASE_URL}league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5?api_key=${process.env.API_KEY}`;
  const res = await fetch(url);
  const json = await res.json();
  const challengers = json.entries;

  const sortedChallengers = challengers.sort(
    (a, b) => a.leaguePoints - b.leaguePoints
  );

  return sortedChallengers[10].leaguePoints;
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

  const res = await fetch(url);
  const json = await res.json();

  return json;
};

module.exports = {
  getRankedData,
  updateMostPlayed,
  getPuuid,
  getGrandmasterLP,
  getChallengerLP,
};
