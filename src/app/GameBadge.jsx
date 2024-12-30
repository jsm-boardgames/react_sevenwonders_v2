import React from 'react';

const bgMap = {
  military: 'bg-red-400',
  treasury: 'bg-yellow-400',
  civilian: 'bg-blue-400',
  commercial: 'bg-yellow-400',
  guild: 'bg-purple-400',
  science: 'bg-green-400',
  naturalResource: 'bg-brown-400',
  manufacturedResource: 'bg-gray-400'
};

// type one of military, treasury, civilian, commercial, guild, science, naturalResource, manufacturedResource
const GameBadge = ({type = 'civilian', value}) => {
  const cn = `${bgMap[type]} m-1 px-2 py-1 rounded-lg`;
  return (
    <span className={cn}>{value}</span>
  );
};

export default GameBadge
