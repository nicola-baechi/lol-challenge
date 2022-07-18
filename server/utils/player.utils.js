const calculateProgress = (currentRank, playerStartData) => {
  if (currentRank.tier !== 'DIAMOND') {
    return currentRank.leaguePoints - playerStartData.LP;
  } else {
    const temp = 100 - currentRank.leaguePoints;
    return -Math.abs(playerStartData.LP + temp);
  }
};

const getMostPlayedChampions = (champions) => {
  const count = {};

  for (const element of champions) {
    if (count[element]) {
      count[element] += 1;
    } else {
      count[element] = 1;
    }
  }

  let data = [];
  Object.keys(count).forEach((key) => {
    const element = {
      name: key,
      games: count[key],
    };
    data.push(element);
  });

  const mostPlayed = data
    .sort((a, b) => {
      return b.games - a.games;
    })
    .slice(0, 3);

  return mostPlayed;
};

const calculateRanking = (data) => {
  let diamonds = data.filter((player) => player.tier === 'DIAMOND');
  let masters = data.filter((player) => player.tier === 'MASTER');
  let grandmasters = data.filter((player) => player.tier === 'GRANDMASTER');

  diamonds = diamonds.sort((a, b) => b.progress - a.progress);
  masters = masters.sort((a, b) => b.progress - a.progress);

  grandmasters = grandmasters.sort((a, b) => {
    if (a.progress === b.progress) {
      return b.LP - a.LP;
    } else {
      return b.progress - a.progress;
    }
  });

  const ranking = [...grandmasters, ...masters, ...diamonds];
  return ranking;
};

module.exports = {
  calculateProgress: calculateProgress,
  getMostPlayedChampions: getMostPlayedChampions,
  calculateRanking: calculateRanking,
};
