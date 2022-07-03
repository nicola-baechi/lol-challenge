const express = require('express');
const service = require('./service');

const {
  BLADESHOW,
  AUTOPHIL,
  SHANTAO,
  SOLA,
  KUTCHER,
} = require('./constants/start');

// CONFIG
const app = express();
const port = 8080;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.route('/ranking').get(async function (req, res) {
  const autophil = await service.buildData(AUTOPHIL);
  const bladeshow = await service.buildData(BLADESHOW);
  const shantao = await service.buildData(SHANTAO);
  const sola = await service.buildData(SOLA);
  const kutcher = await service.buildData(KUTCHER);

  let data = [autophil, bladeshow, shantao, sola, kutcher];
  data = calculateRanking(data);
  

  const response = data.map((player, index) => ({
    ...player,
    position: index + 1,
  }));

  res.send(response);
});

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
