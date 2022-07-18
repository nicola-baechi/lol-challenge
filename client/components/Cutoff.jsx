export const Cutoff = ({ GMLP }) => {
  return (
    <div
      className='flex m-3 items-center justify-center gap-5
    bg-[#1f1f23] drop-shadow-lg p-4 pl-5 rounded-lg text-white'
    >
      <img
        src={`https://static.u.gg/assets/lol/ranks/2d/grandmaster.svg`}
        className='h-10'
      />
      <h6>
        Grenze bei ~ <span className='text-[#cd4241] font-bold'>{GMLP} LP</span>
      </h6>
    </div>
  );
};
