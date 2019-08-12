import React from 'react';
import Card from './Card';

const Hand = ({hand = [], sendMessage, setOverlayChildren}) => {
  const maxCards = hand.length;
  const cardClasses = {
    red: 'sw-military-card',
    blue: 'sw-cultural-card',
    brown: 'sw-natural-resource-card',
    grey: 'sw-manufactured-resource-card',
    green: 'sw-science-card',
    purple: 'sw-guild-card',
    yellow: 'sw-commercial-card'
  };
  const svgWidth = 800;
  const viewBox = `0 0 ${svgWidth} ${svgWidth / 2}`;
  const midway = (maxCards - 1) / 2;
  return (
    <svg viewBox={viewBox} xmlns='http://www.w3.org/2000/svg' className='sw-hand w-full h-screen-75'>
      {hand.map((card, idx, arr) => {
        const x = 325 + (60 * (idx - midway));
        const rotate = `rotate(${10 * (idx - midway)} 400 200)`;
        return <Card key={idx} svgAttributes={{transform: rotate}} sendMessage={sendMessage} setOverlayChildren={setOverlayChildren} {...card} y={30} x={x} />;
      })}
    </svg>
  );
}

export default Hand;
