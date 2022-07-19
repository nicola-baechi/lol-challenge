const BASE_URL = 'https://euw1.api.riotgames.com/lol/';
const RANK_API = 'league/v4/entries/by-summoner/';
const ACCOUNT_API = 'summoner/v4/summoners/by-name/';

const MATCHES_API = 'https://europe.api.riotgames.com/lol/match/v5/matches/';

const today = Math.floor(new Date().getTime() / 1000);
const MATCHES_PARAMS = `/ids?endTime=${today}&startTime=1656576000&type=ranked&count=100`;

module.exports = {
  BASE_URL,
  RANK_API,
  ACCOUNT_API,
  MATCHES_API,
  MATCHES_PARAMS,
};
