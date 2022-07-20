const calculateProgress = (currentRank, playerStartData) => {
  if (currentRank.tier !== 'DIAMOND') {
    return currentRank.leaguePoints - playerStartData.LP;
  } else {
    if (currentRank.rank === 'I') {
      const temp = 100 - currentRank.leaguePoints;
      console.log('test');
      return -Math.abs(playerStartData.LP + temp);
    } else if (currentRank.rank === 'II') {
      const temp = 200 - currentRank.leaguePoints;
      return -Math.abs(playerStartData.LP + temp);
    } else if (currentRank.rank === 'III') {
      const temp = 300 - currentRank.leaguePoints;
      return -Math.abs(playerStartData.LP + temp);
    }
  }
};

const getMostPlayedChampions = (champions) => {
  const mostPlayed = champions
    .sort((a, b) => {
      return b.games - a.games;
    })
    .slice(0, 3);

  const top3 = [];
  for (element of mostPlayed) {
    top3.push(element.champion);
  }

  return top3;
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
  calculateProgress,
  getMostPlayedChampions,
  calculateRanking,
};
