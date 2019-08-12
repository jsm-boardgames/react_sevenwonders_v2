import React from 'react';
import Separator from './Separator';
import Resource from './Resource';

const CARD_CLASSES = {
  red: 'sw-military-card',
  blue: 'sw-cultural-card',
  brown: 'sw-natural-resource-card',
  grey: 'sw-manufactured-resource-card',
  green: 'sw-science-card',
  purple: 'sw-guild-card',
  yellow: 'sw-commercial-card'
};
const Card = ({name, value, cost, svgAttributes = {}, x = 0, y = 0, color, sendMessage, setOverlayChildren}) => {
  const onClick = (e) => {
    setOverlayChildren && setOverlayChildren((
      <svg viewBox='0 0 150 220' xmlns='http://www.w3.org/2000/svg' className='h-screen-50 w-3/4'>
        <Card name={name} value={value} cost={cost} color={color} sendMessage={sendMessage} />
      </svg>
    ));
  };
  const cn = `sw-card ${CARD_CLASSES[color]}${!setOverlayChildren ? '' : ' cursor-pointer'}`;
  return (
    <g className={cn} {...svgAttributes} onClick={onClick}>
      <rect x={x} y={y} width='150' height='220' />
      <text x={x + 5} y={y + 15} textLength="90" className='text-sm'>{name}</text>
      <foreignObject x={x + 5} y={y + 30} width='140' height='190'>
        <div>Cost: {cost && cost.split('').map((r,i) => <Resource resource={r} key={i} />)}</div>
        <Separator />
        <div>Value: {value}</div>
      </foreignObject>
    </g>
  );
};

export default Card;
