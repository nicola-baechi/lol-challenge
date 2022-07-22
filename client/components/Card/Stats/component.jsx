import { GoTriangleUp, GoTriangleDown } from 'react-icons/go';

export const Stats = ({ tier, p_rank, lp, wr, progress, lpToUprank }) => {
  const _progress = progress.replace(/\-/g, '');

  const rankIcon =
    tier !== 'GM'
      ? `https://static.u.gg/assets/lol/ranks/2d/${tier.toLowerCase()}.svg`
      : 'https://static.u.gg/assets/lol/ranks/2d/grandmaster.svg';

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
        size: 'text-xl',
        lp: 'text-xl',
        gap: 'gap-3',
      };
    } else if (tier === 'DIAMOND') {
      return {
        size: 'text-xl',
        lp: 'text-xl',
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

  return (
    <div className='flex items-center gap-3'>
      <img src={rankIcon} className='h-14' />
      <div className='flex flex-col justify-center gap-2'>
        <div
          className={`text-2xl flex items-center ${getStyleByTier(tier).gap}`}
        >
          <span
            className={`${getColorByTier(tier)}
               ${getStyleByTier(tier).size} 
               font-semibold`}
          >
            {tier}
            {tier == 'DIAMOND' && ` ${p_rank}`}
          </span>
          <span className=' text-gray-500 font-medium'>·</span>
          <span className={`font-semibold ${getStyleByTier(tier).lp}`}>
            {lp} LP
          </span>
        </div>
        <div className='flex items-center text-lg font-medium -ml-1.5 gap-2.5'>
          <div className='flex justify-center items-center gap-1.5'>
            <div>
              {progress > 0 ? (
                <GoTriangleUp color='#3279f9' size={25} />
              ) : (
                <GoTriangleDown color='#fe494a' size={25} />
              )}
            </div>
            <h6>{_progress}</h6>
          </div>
          <div className='text-gray-500 text-lg'>/</div>
          <div className='flex items-center gap-3'>
            <h6 className='font-normal text-lg'>
              <span className='font-semibold'>{lpToUprank} LP</span> für
              {tier !== 'GRANDMASTER' ? (
                <span className='font-semibold text-[#cd4241]'> GM</span>
              ) : (
                <span className='font-semibold text-[#efcc75]'> CH</span>
              )}
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};
