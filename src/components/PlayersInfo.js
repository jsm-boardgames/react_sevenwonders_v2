import React from 'react';

const PlayerInfo = ({playerName = '', coins = 0, military = 0, stagesInfo = [], wonderSide = 'a', wonderName = '', wonderResource = '', cardsPlayed = []}) => {
  return (
    <div className='w-full flex flex-col bg-blue-200 m-2 p-4 rounded-lg'>
      <div>{playerName}</div>
      <div>${coins}</div>
      <div>{wonderName} - {wonderSide}</div>
    </div>
  );
};

const PlayersInfo = ({playersInfo = {}}) => {
  console.log(playersInfo);
  return (
    <div className='flex flex-col h-full w-full justify-around'>
      {Object.entries(playersInfo).map(([playerId, playerInfo]) => <PlayerInfo key={playerId} {...playerInfo} />)}
    </div>
  );
};

export default PlayersInfo;
