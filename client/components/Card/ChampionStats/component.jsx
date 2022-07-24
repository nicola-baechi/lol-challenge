import { TbArrowBackUp } from 'react-icons/tb';
import { Row } from './Row';
export const ChampionStats = ({ playerData, isFlipped, setIsFlipped }) => {
  const cardUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${playerData.champions[0].champion}_0.jpg`;

  return (
    <div
      style={{
        backgroundImage: `url(${cardUrl})`,
        backgroundPosition: 'top',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '408px 240px',
        backgroundBlendMode: 'overlay',
      }}
      className='flex items-center flex-col bg-[#1f1f23] 
      drop-shadow-lg text-white p-10 m-5 rounded-xl w-96 h-[22rem] gap-3'
    >
      <div className='flex w-full justify-center text-xs gap-3 font-normal'>
        <h6>
          <span className='font-medium'>
            {parseInt(playerData.wins) + parseInt(playerData.losses)}
          </span>{' '}
          Spiele gespielt
        </h6>
        ·
        <h6>
          <span className='font-medium'>{playerData.champions.length} </span>
          verschiedene Champions
        </h6>
      </div>
      <div
        className='w-full max-h-max rounded-lg overflow-auto 
        bg-neutral-950 p-4 scrollbar drop-shadow-lg'
      >
        <table className='border-collapse min-w-full '>
          <thead className='text-sm'>
            <tr className='text-left uppercase'>
              <th className='font-medium text-sm'>Champion</th>
              <th className='font-medium'>Win Rate</th>
              <th className='font-medium'>KDA</th>
            </tr>
          </thead>
          <tbody>
            {playerData.champions.map((champion) => (
              <>
                <Row champion={champion} key={champion.id} />
                <div className='h-2'></div>
              </>
            ))}
          </tbody>
        </table>
      </div>
      <button
        className='absolute left-1 top-1 bg-[#1f1f23] p-2 rounded-lg
      hover:bg-[#3a3a3d]'
      onClick={() => setIsFlipped(!isFlipped)}
      >
        <TbArrowBackUp size={20} />
      </button>
    </div>
  );
};
