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

  // get top 3 most played champions
  const top3 = Object.keys(count)
    .sort((a, b) => count[b] - count[a])
    .slice(0, 3);

  return top3;
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
