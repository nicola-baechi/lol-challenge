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
  const diamonds = data.filter((player) => player.tier === 'DIAMOND');
  if (diamonds.length == 0) {
    const sorted = data.sort((a, b) => {
      return b.lp - a.lp;
    });
    return sorted;
  } else {
    const sortedDiamonds = diamonds.sort((a, b) => {
      return b.lp - a.lp;
    });

    const rest = data
      .filter((player) => player.tier !== 'DIAMOND')
      .sort((a, b) => {
        return b.lp - a.lp;
      });

    return rest.concat(sortedDiamonds);
  }
};

module.exports = {
  calculateProgress: calculateProgress,
  getMostPlayedChampions: getMostPlayedChampions,
  calculateRanking: calculateRanking,
};
