import React from 'react';
import Separator from './Separator';
import Resource from './Resource';

const CardHtml = ({name, players, value, cost, color,}) => {
  const cn = `sw-card bg-${color}-400 w-32 h-48 rounded-lg`;
  return (
    <div className={cn}>
      <div className='text-sm'>{name}</div>
      <div>Cost: {cost && cost.split('').map((r,i) => <Resource resource={r} key={i} />)}</div>
      <Separator />
      <div>Value: {value}</div>
    </div>
  );
};

export default CardHtml;
