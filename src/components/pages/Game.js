import React from 'react';
import Hand from './../Hand';

const Game = ({playersInfo, hand, playOrder, direction, wonders, playerInfo, setOverlayChildren, sendMessage}) => {
  return (
    <div className='w-full h-full'>
      <div className="w-1/4 inline">Info here about who's in the game</div>
      <div className="w-3/4 inline float-right">
        <Hand hand={hand} setOverlayChildren={setOverlayChildren} sendMessage={sendMessage} />
      </div>
    </div>
  );
}

export default Game;
