import React from 'react';
import Hand from './../Hand';
import PlayersInfo from './../PlayersInfo';
import FreePlay from './../FreePlay';
import { ErrorBoundary } from '../../components/error-boundary';

const ErrorPage = () => (
  <h1>Something broke. Sorry</h1>
)

const Game = ({playersInfo, canPlay, hand, possibleCards, playOrder, direction, wonders, playerInfo, setOverlayChildren, sendMessage, wonderCombos}) => {
  const cardsComponent = possibleCards.length > 0 ?
      <FreePlay possibleCards={possibleCards} sendMessage={sendMessage} /> :
      !!playerInfo ?
      <Hand olympiaFreeBuild={playerInfo.olympiaFreeBuild} canPlay={canPlay} hand={hand} setOverlayChildren={setOverlayChildren} sendMessage={sendMessage} wonderCombos={wonderCombos} />
      : null;

  return (
    <ErrorBoundary fallback={<ErrorPage />}>
    <div className='w-full h-full'>
      <div className="w-1/4 inline-flex h-full">
        <PlayersInfo direction={direction} playOrder={playOrder} playersInfo={playersInfo} setOverlayChildren={setOverlayChildren} />
      </div>
      <div className="w-3/4 inline float-right">
        {cardsComponent}
      </div>
    </div>
    </ErrorBoundary>
  );
}

export default Game;
