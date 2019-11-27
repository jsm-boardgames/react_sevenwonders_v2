import React from 'react';
import Hand from './../Hand';
import PlayersInfo from './../PlayersInfo';
import FreePlay from './../FreePlay';

const Game = ({playersInfo, canPlay, hand, possibleCards, playOrder, direction, wonders, playerInfo, setOverlayChildren, sendMessage, wonderCombos}) => {
  const cardsComponent = possibleCards.length > 0 ?
      <FreePlay possibleCards={possibleCards} sendMessage={sendMessage} /> :
      <Hand olympiaFreeBuild={playerInfo.olympiaFreeBuild} canPlay={canPlay} hand={hand} setOverlayChildren={setOverlayChildren} sendMessage={sendMessage} wonderCombos={wonderCombos} />;

  return (
    <div className='w-full h-full'>
      <div className="w-1/4 inline-flex h-full">
        <PlayersInfo playOrder={playOrder} playersInfo={playersInfo} setOverlayChildren={setOverlayChildren} />
      </div>
      <div className="w-3/4 inline float-right">
        {cardsComponent}
      </div>
    </div>
  );
}

export default Game;
