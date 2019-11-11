import React from 'react';
import PlayersInfo from './../PlayersInfo';
import ScoreSheet from './../ScoreSheet';

const EndGame = ({playersInfo, ranking, playOrder, setOverlayChildren,}) => {
  return (
    <div className='w-full h-full'>
      <div className="w-1/4 inline-flex h-full">
        <PlayersInfo playOrder={playOrder} playersInfo={playersInfo} setOverlayChildren={setOverlayChildren} />
      </div>
      <div className="p-10 w-3/4 inline float-right">
        <ScoreSheet ranking={ranking} />
      </div>
    </div>
  );
}

export default EndGame;
