import { Header } from './Header';
import { Stats } from './Stats';
import { Score } from './Score';
import { Button } from '../Button';
export const RankedStats = ({ playerData, isFlipped, setIsFlipped, index }) => {
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
      className='flex justify-center items-center flex-col bg-[#1f1f23]
      drop-shadow-lg text-white p-10 m-5 rounded-lg w-96 h-[22rem] gap-3'
    >
      <Header
        username={playerData.username}
        name={playerData.name}
        index={index}
      />
      <Stats
        tier={playerData.tier}
        p_rank={playerData.p_rank}
        lp={playerData.lp}
        progress={playerData.progress}
        lpToUprank={playerData.lp_to_uprank}
      />
      <Score
        wins={playerData.wins}
        losses={playerData.losses}
        wr={playerData.wr}
      />
      <Button isFlipped={isFlipped} setIsFlipped={setIsFlipped} />
    </div>
  );
};
