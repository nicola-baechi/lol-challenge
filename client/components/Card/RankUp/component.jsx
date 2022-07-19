export const RankUp = ({ lp_to_uprank, tier }) => {
  return (
    <div className='flex p-3 flex-col items-center gap-2 bg-[#3a3a3d] font-medium rounded-md'>
      <div className='flex gap-2 items-baseline'>
        <h6 className='text-xl'>{lp_to_uprank} LP</h6>
        <h6 className='text-xs font-medium text-[gray-400]'>FÜR</h6>
      </div>
      {tier == 'GRANDMASTER' ? (
        <img
          src={`https://static.u.gg/assets/lol/ranks/2d/challenger.svg`}
          className='h-12'
        />
      ) : (
        <img
          src={`https://static.u.gg/assets/lol/ranks/2d/grandmaster.svg`}
          className='h-12'
        />
      )}
    </div>
  );
};
