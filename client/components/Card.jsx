import { useEffect } from 'react';
import { GoTriangleUp, GoTriangleDown } from 'react-icons/go';
import { TbCrown } from 'react-icons/tb';

export const Card = ({ playerData, index }) => {
  const progress = playerData.progress.toString().replace(/\-/g, '');

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

  useEffect(() => {});
  return (
    <div
      className='flex justify-center items-center 
        flex-col bg-[#1f1f23] drop-shadow-lg text-white p-10 m-3 rounded-lg w-96 h-[21rem] gap-2'
    >
      <div className='tooltip' data-tip={`${playerData.name} gewinnt gerade`}>
        {playerData.position == 1 && <TbCrown size={25} color='#f4c675' />}
      </div>
      <div className='flex gap-2 items-center mb-2'>
        <div className={`${rankColors[index]} font-bold p-1 pr-3 pl-3 rounded`}>
          {index + 1}
        </div>
        <div className='font-bold text-2xl hover:underline'>
          <a
            href={`https://euw.op.gg/summoners/euw/${playerData.username}`}
            target='_blank'
          >
            {playerData.username}
          </a>
        </div>
      </div>
      <div className='font-bold text-2xl'>
        <span className={`${getColorByTier(playerData.tier)} font-semibold`}>
          {playerData.tier}
          {playerData.tier !== 'MASTER' && ` ${playerData.rank}`}
        </span>
        <span className=' text-gray-500 ml-2 mr-1'>·</span>{' '}
        <span className='font-semibold'>{playerData.lp} LP</span>
      </div>
      <div className='flex items-center justify-center'>
        <div>
          {playerData.progress > 0 ? (
            <GoTriangleUp color='#3279f9' size={25} />
          ) : (
            <GoTriangleDown color='#fe494a' size={25} />
          )}
        </div>
        <div className='font-semibold text-xl ml-1'>
          {progress}
          <span className='text-gray-500 ml-1 mr-1'> / </span>
          <span>{playerData.wr}% WR</span>
        </div>
      </div>
      <img
        src={`https://static.u.gg/assets/lol/ranks/2d/${playerData.tier.toLowerCase()}.svg`}
        className='mt-5 h-20'
      />
    </div>
  );
};
