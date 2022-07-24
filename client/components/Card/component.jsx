import ReactCardFlip from 'react-card-flip';
import { useState } from 'react';
import { RankedStats } from './RankedStats';
import { ChampionStats } from './ChampionStats';

export const Card = ({ playerData, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection='horizontal'>
      <RankedStats
        playerData={playerData}
        isFlipped={isFlipped}
        setIsFlipped={setIsFlipped}
        index={index}
      />
      <ChampionStats
        playerData={playerData}
        isFlipped={isFlipped}
        setIsFlipped={setIsFlipped}
      />
    </ReactCardFlip>
  );
};
