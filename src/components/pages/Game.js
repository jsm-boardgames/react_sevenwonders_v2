import React from 'react';
import Hand from './../Hand';
import PlayersInfo from './../PlayersInfo';

const Game = ({playersInfo, hand, playOrder, direction, wonders, playerInfo, setOverlayChildren, sendMessage, wonderCombos}) => {
  return (
    <div className='w-full h-full'>
      <div className="w-1/4 inline-flex h-full">
        <PlayersInfo playOrder={playOrder} playersInfo={playersInfo} setOverlayChildren={setOverlayChildren} />
      </div>
      <div className="w-3/4 inline float-right">
        <Hand hand={hand} setOverlayChildren={setOverlayChildren} sendMessage={sendMessage} wonderCombos={wonderCombos} />
      </div>
    </div>
  );
}

export default Game;
