import React, { useRef, useEffect, } from 'react';
import GameBadge from './GameBadge';
import PlayerSummary from './PlayerSummary';
import PlayerDetails from './PlayerDetails';

const PlayerInfo = ({
    playerName = '',
    coins = 0,
    military = 0,
    stagesInfo = [],
    wonderSide = 'a',
    wonderName = '',
    wonderResource = '',
    cardsPlayed = [],
    scienceValues = [],
    setOverlayChildren,
}) => {
  const myRef = useRef(null);
  useEffect(() => {
    if (myRef.current != null) {
      myRef.current.querySelector('.popover').style.left = `${myRef.current.offsetWidth + 10}px`;
      myRef.current.querySelector('.popover').style.top = `${myRef.current.getBoundingClientRect().y - 25}px`;
    }
  }, [myRef]);
  const stage = stagesInfo.filter(s => s.isBuilt).length;
  const stageNum = stage === 4 ? 'IV' : 'I'.repeat(stage);
  const wonderDisplay = stage === 0 ?
      `${wonderName} side: ${wonderSide}` :
      `${wonderName} side: ${wonderSide} stage: ${stageNum}`;
  const badges = Object.entries(cardsPlayed.reduce((acc, curr) => {
    acc[curr.type] = !acc[curr.type] ? 1 : acc[curr.type] + 1;
    return acc;
  }, {})).map(([type, value]) => <GameBadge type={type} value={value} key={type} />);
  const formattedCoins = `$${coins}`;
  const displayDetails = () => {
    setOverlayChildren(<PlayerDetails 
        playerName={playerName}
        coins={coins}
        military={military}
        stagesInfo={stagesInfo}
        wonderSide={wonderSide}
        wonderName={wonderName}
        wonderResource={wonderResource}
        cardsPlayed={cardsPlayed} />);
  };
  return (
    <div ref={myRef} onClick={displayDetails} className='popover-container w-full flex flex-col bg-blue-200 hover:bg-blue-300 m-2 p-4 rounded-lg cursor-pointer'>
      <div>{playerName}</div>
      <div><GameBadge type='treasury' value={formattedCoins} /> {badges}</div>
      <div>{wonderDisplay}</div>
      <div className="fixed popover">
        <PlayerSummary
          playerName={playerName}
          coins={coins}
          military={military}
          stagesInfo={stagesInfo}
          wonderSide={wonderSide}
          wonderName={wonderName}
          wonderResource={wonderResource}
          cardsPlayed={cardsPlayed}
          scienceValues={scienceValues}
        />
      </div>
    </div>
  );
};

const PlayersInfo = ({playOrder = [], playersInfo = {}, setOverlayChildren, direction}) => {
  return (
    <div className='flex flex-col h-full w-11/12 justify-around'>
      {playOrder.map(({playerId, direction}, index) => {
        return (
          <React.Fragment key={playerId}>
            <PlayerInfo key={playerId} {...playersInfo[playerId]} setOverlayChildren={setOverlayChildren} />
            {index < playOrder.length - 1 && <div className='w-full text-center'>{direction === 'clockwise' ? '/\\' : '\\/'}</div>}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default PlayersInfo;
