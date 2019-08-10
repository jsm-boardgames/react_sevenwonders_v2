import React from 'react';
import Separator from './../Separator';

const Waiting = ({players = [], name, maxPlayers, creatorId, playerId}) => {
  const playersInfo = players.map((p) => {
    return (
      <div key={p.id} className='rounded text-center py-2 bg-blue-200 border-2 border-blue-400 my-3 mx-auto w-3/4'>
        {p.name}
      </div>
    );
  });
  return (
    <div className='bg-gray-200 container mx-auto rounded-lg'>
      <h1 className='text-center text-3xl my-4'>{name}</h1>
      <div className='text-center'>
        <p>Waiting for {maxPlayers - players.length} more players</p>
      </div>
      <Separator color='gray-400' margin='4' />
      {playersInfo}
    </div>
  );
};

export default Waiting;
