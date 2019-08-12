import React from 'react';
const NATURAL_RESOURCES = ['S', 'C', 'O', 'W'];
const isNaturalResource = (resource) => {
  return NATURAL_RESOURCES.some(r => resource.indexOf(r) > -1);
};
//const MANUFACTURED_RESOURCES = ['L', 'G', 'P'];
const Resource = ({resource}) => {
  const color = isNaturalResource(resource) ? 'bg-brown-400' : 'bg-gray-400';
  const className = `${color} px-2 py-1 m-1 rounded-full text-center`;
  return (
    <span className={className}>{resource}</span>
  );
};

export default Resource;
