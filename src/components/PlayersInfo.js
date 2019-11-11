import React from 'react';
import GameBadge from './GameBadge';

const PlayerInfo = ({playerName = '', coins = 0, military = 0, stagesInfo = [], wonderSide = 'a', wonderName = '', wonderResource = '', cardsPlayed = []}) => {
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
    <div className='w-full flex flex-col bg-blue-200 m-2 p-4 rounded-lg'>
      <div>{playerName}</div>
      <div><GameBadge type='treasury' value={formattedCoins} /> {badges}</div>
      <div>{wonderDisplay}</div>
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
