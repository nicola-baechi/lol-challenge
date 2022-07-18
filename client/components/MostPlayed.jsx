export const MostPlayed = ({ mostPlayed }) => {
  return (
    <div
      className='flex flex-col bg-[#3a3a3d] rounded-md 
          p-3 justify-around items-center font-semibold '
    >
      <div>MOST PLAYED</div>
      <div className='flex gap-3 '>
        {mostPlayed.map((item) => (
          <img
            key={item}
            className='w-10 rounded-md border-2 border-gray-500'
            src={`http://ddragon.leagueoflegends.com/cdn/12.12.1/img/champion/${item.champion}.png`}
          />
        ))}
      </div>
    </div>
  );
};
