export const Score = ({ wins, losses, wr }) => {
  const value = `w-[${wr}%]`;

  return (
    <div className='flex flex-col w-full'>
      <div className='flex m-1 gap-4 font-semibold'>
        <h6>
          <span className='text-[#1cbd9d]'>{wins}</span>
          <span className='text-gray-500 mr-3'> W</span>
          <span className='text-[#e44584]'>{losses}</span>
          <span className='text-gray-500'> L</span>
        </h6>
        <h6 className='font-normal'>·</h6>
        <h6>{wr}%</h6>
      </div>
      <div className='h-1 relative max-w-xl overflow-hidden'>
        <div className='w-full h-full bg-[#e44584] absolute'></div>
        <div className={`h-full bg-[#1cbd9d] absolute ${value}`}></div>
      </div>
    </div>
  );
};
