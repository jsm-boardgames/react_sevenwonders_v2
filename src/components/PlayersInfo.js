import React, { useRef, useEffect, } from 'react';
import GameBadge from './GameBadge';
import PlayerSummary from './PlayerSummary';

const PlayerInfo = ({playerName = '', coins = 0, military = 0, stagesInfo = [], wonderSide = 'a', wonderName = '', wonderResource = '', cardsPlayed = [], scienceValues = []}) => {
  const myRef = useRef(null);
  useEffect(() => {
    if (myRef.current != null) {
      myRef.current.querySelector('.popover').style.left = `${myRef.current.offsetWidth + 10}px`;
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
  return (
    <div ref={myRef} className='popover-container w-full flex flex-col bg-blue-200 hover:bg-blue-300 m-2 p-4 rounded-lg'>
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

const PlayersInfo = ({playOrder = [], playersInfo = {}}) => {
  return (
    <div className='flex flex-col h-full w-11/12 justify-around'>
      {playOrder.map(({playerId, direction}, index) => {
        return (
          <React.Fragment key={playerId}>
            <PlayerInfo key={playerId} {...playersInfo[playerId]} />
            {index < playOrder.length - 1 && <div className='w-full text-center'>{direction === 'clockwise' ? '/\\' : '\\/'}</div>}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default PlayersInfo;
