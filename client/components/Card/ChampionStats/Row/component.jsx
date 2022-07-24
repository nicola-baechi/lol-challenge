
export const Row = ({ champion }) => {
  const winrate = Math.round(
    (100 / (parseInt(champion.wins) + parseInt(champion.losses))) *
      parseInt(champion.wins)
  );

  const kda =
    (parseInt(champion.kills) + parseInt(champion.assists)) /
    parseInt(champion.deaths);

  const getWinrateColor = () => {
    if (winrate >= 70) {
      return 'text-[#f39100]';
    } else if (winrate >= 60) {
      return 'text-[#3072ec]';
    } else if (winrate <= 40) {
      return 'text-[#f94749]';
    }
  };

  const getKDAColor = () => {
    if (kda >= 5) {
      return 'text-[#f39100]';
    } else if (kda >= 3) {
      return 'text-[#3072ec]';
    }
  };

  const url = `http://ddragon.leagueoflegends.com/cdn/12.13.1/img/champion/${champion.champion}.png`;

  return (
    <tr
      key={champion.id}
      className='text-sm border-b-[#1f1f23] border-b-4 font-medium'
    >
      <td className='p-1.5'>
        <img className='w-12' src={url} alt={champion.champion} />
      </td>
      <td className=''>
        <span className={`${getWinrateColor()}`}>{winrate}% </span>
        <span className='font-medium text-gray-500'>/ </span>
        <span>
          {champion.wins}
          <span className='text-gray-500 font-normal'> W</span>{' '}
          {champion.losses}
          <span className='text-gray-500 font-normal'> L</span>
        </span>
      </td>
      <td className={`${getKDAColor()}`}>{kda.toFixed(2)}</td>
    </tr>
  );
};
