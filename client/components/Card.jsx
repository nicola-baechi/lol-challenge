import { useEffect } from 'react';
import { GoTriangleUp, GoTriangleDown } from 'react-icons/go';
import { TbCrown } from 'react-icons/tb';

export const Card = ({ playerData, index }) => {
  console.log('playerData', playerData)
  const progress = playerData.progress.replace(/\-/g, '');

  const rankIcon =
    playerData.tier !== 'GM'
      ? `https://static.u.gg/assets/lol/ranks/2d/${playerData.tier.toLowerCase()}.svg`
      : 'https://static.u.gg/assets/lol/ranks/2d/grandmaster.svg';

  const rankColors = [
    'text-[#ff9800] bg-[#3b2c2e]',
    'text-[#3279f9] bg-[#1c2854]',
    'text-[#1ba668] bg-[#135437]',
    'text-[#ffffff] bg-[#2f2f36]',
    'text-[#ffffff] bg-[#2f2f36]',
  ];

  const getColorByTier = (tier) => {
    switch (tier) {
      case 'DIAMOND':
        return 'text-[#576fcd]';
      case 'MASTER':
        return 'text-[#9d4ede]';
      case 'GRANDMASTER':
        return 'text-[#cd4241]';
      case 'CHALLENGER':
        return 'text-[#f4c675]';
      default:
        return 'text-[#9d4ede]';
    }
  };

  const getStyleByTier = (tier) => {
    if (tier === 'MASTER') {
      return {
        size: 'text-2xl',
        lp: 'text-2xl',
        gap: 'gap-5',
      };
    } else if (tier === 'DIAMOND') {
      return {
        size: 'text-2xl',
        lp: 'text-2xl',
        gap: 'gap-2',
      };
    } else {
      return {
        size: 'text-lg font-bold',
        lp: 'text-lg',
        gap: 'gap-2',
      };
    }
  };

  const cardUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${playerData.mostPlayed[0]}_0.jpg`;

  useEffect(() => {});
  return (
    <div
      style={{
        backgroundImage: `url(${cardUrl})`,
        backgroundPosition: 'top',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '450px 230px',
        backgroundBlendMode: 'overlay',
      }}
      className='flex justify-center items-center flex-col bg-[#1f1f23] 
      drop-shadow-lg text-white p-10 m-3 rounded-lg w-96 h-[22rem] gap-3'
    >
      <div className='tooltip' data-tip={`${playerData.name} gewinnt gerade`}>
        {index == 0 && <TbCrown size={25} color='#f4c675' />}
      </div>
      <div className='flex gap-2 items-center mb-2'>
        <div className={`${rankColors[index]} font-bold p-1 pr-3 pl-3 rounded`}>
          {index + 1}
        </div>
        <div className='font-bold text-2xl hover:underline'>
          <a
            href={`https://euw.op.gg/summoners/euw/${playerData.player}`}
            target='_blank'
            rel='noreferrer'
          >
            {playerData.player}
          </a>
        </div>
      </div>
      <div className='flex items-center gap-3'>
        <img src={rankIcon} className='h-16' />
        <div className='flex flex-col justify-center gap-2'>
          <div
            className={`text-2xl flex items-center ${
              getStyleByTier(playerData.tier).gap
            }`}
          >
            <span
              className={`${getColorByTier(playerData.tier)}
               ${getStyleByTier(playerData.tier).size} 
               font-semibold`}
            >
              {playerData.tier}
              {playerData.tier == 'DIAMOND' && ` ${playerData.rank}`}
            </span>
            <span className=' text-gray-500 font-bold'>·</span>
            <span
              className={`font-semibold ${getStyleByTier(playerData.tier).lp}`}
            >
              {playerData.lp} LP
            </span>
          </div>
          <div className='flex items-center gap-8 text-xl font-medium'>
            <div className='flex justify-center items-center gap-1.5'>
              <div>
                {playerData.progress > 0 ? (
                  <GoTriangleUp color='#3279f9' size={25} />
                ) : (
                  <GoTriangleDown color='#fe494a' size={25} />
                )}
              </div>
              <h6>{progress}</h6>
            </div>
            <div className='text-gray-500 text-xl'>/</div>
            <h6 className='font-normal'>{playerData.wr}% WR</h6>
          </div>
        </div>
      </div>
      <div className='flex mt-5 w-full justify-between'>
        <div className='flex p-3 flex-col items-center gap-2 bg-[#3a3a3d] font-medium rounded-md'>
          <div className='flex gap-2 items-baseline'>
            <h6 className='text-xl'>{playerData.lpToGM} LP</h6>
            <h6 className='text-xs font-medium text-[gray-400]'>FÜR</h6>
          </div>
          <img
            src={`https://static.u.gg/assets/lol/ranks/2d/grandmaster.svg`}
            className='h-12'
          />
        </div>
        <div
          className='flex flex-col bg-[#3a3a3d] rounded-md 
          p-3 justify-around items-center font-semibold '
        >
          <div>MOST PLAYED</div>
          <div className='flex gap-3 '>
            {playerData.mostPlayed.map((item) => (
              <img
                key={item}
                className='w-10 rounded-md border-2 border-gray-500'
                src={`http://ddragon.leagueoflegends.com/cdn/12.12.1/img/champion/${item}.png`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
