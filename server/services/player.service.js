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
const sleep = require('util').promisify(setTimeout);

const request = async (url) => {
  const res = await fetch(url);
  const json = await res.json();
  return json;
};

const getRankedData = async (username) => {
  const accountId = await getAccountId(username);
  const url = `${BASE_URL}${RANK_API}${accountId}?api_key=${process.env.API_KEY}`;
  const response = fetch(url)
    .then((res) => res.json())
    .then((json) => {
      if (json.hasOwnProperty('status')) {
        if (json.status.status_code === 429) {
          console.error('rate limit exceeded');
        } else if (match.status.status_code === 401) {
          console.error('key has expired');
        }
      } else {
        return json.find((rank) => rank.queueType === 'RANKED_SOLO_5x5');
      }
    });

  return response;
};

const updateMostPlayed = async (username) => {
  const puuid = await getPuuid(username);
  const matches = await getMatchesByPuuid(puuid);
  console.log(matches.length);
  // wait for rate limiting to be reset
  await sleep(120000);

  let champions = [];
  for (let [index, matchId] of matches.entries()) {
    if (index % 100 === 0) {
      await sleep(120000);
    }
    const match = await getMatchInfo(matchId);
    if (match.hasOwnProperty('status')) {
      if (match.status.status_code === 429) {
        console.error('rate limit exceeded');
        return;
      } else if (match.status.status_code === 401) {
        console.error('key has expired');
        return;
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
  const req = await request(url);

  return req;
};

const getMatchesByPuuid = async (puuid) => {
  const url = `${MATCHES_API}by-puuid/${puuid}${MATCHES_PARAMS}&api_key=${process.env.API_KEY}`;
  let matches = await request(url);

  let tempMatches = matches;
  let nextMatches = [];
  let completed = false;
  let start = 0;

  while (!completed) {
    if (tempMatches.length < 100) {
      completed = true;
    } else {
      start += 100;
      const nextUrl = `${MATCHES_API}by-puuid/${puuid}${MATCHES_PARAMS}&start=${start}&api_key=${process.env.API_KEY}`;

      await sleep(120000);

      const response = await request(nextUrl);
      nextMatches = nextMatches.concat(response);
      tempMatches = response;
    }
  }

  matches = matches.concat(nextMatches);
  return matches;
};

const getGrandmasterLP = async () => {
  const url = `${BASE_URL}league/v4/masterleagues/by-queue/RANKED_SOLO_5x5?api_key=${process.env.API_KEY}`;
  const response = await request(url);
  const masters = response.entries;

  const sortedMasters = masters.sort((a, b) => b.leaguePoints - a.leaguePoints);
  return sortedMasters[20].leaguePoints;
};

const getChallengerLP = async () => {
  const url = `${BASE_URL}league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5?api_key=${process.env.API_KEY}`;
  const response = await request(url);
  const challengers = response.entries;

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
  return await request(url);
};

module.exports = {
  getRankedData,
  updateMostPlayed,
  getPuuid,
  getGrandmasterLP,
  getChallengerLP,
};
