import React, {useState} from 'react';
import Card from './Card';

const Hand = ({olympiaFreeBuild = false, canPlay, hand = [], sendMessage, setOverlayChildren, wonderCombos}) => {
  const maxCards = hand.length;
  const svgWidth = 800;
  const viewBox = `0 0 ${svgWidth} ${svgWidth / 2}`;
  const midway = (maxCards - 1) / 2;
  return (
    <svg viewBox={viewBox} xmlns='http://www.w3.org/2000/svg' className='sw-hand w-full h-screen-75'>
      {hand.map((card, idx, arr) => {
        const x = 325 + (60 * (idx - midway));
        const rotate = `rotate(${10 * (idx - midway)} 400 200)`;
        return <Card key={idx} olympiaFreeBuild={olympiaFreeBuild} svgAttributes={{transform: rotate}} sendMessage={sendMessage} setOverlayChildren={canPlay && setOverlayChildren} {...card} y={30} x={x} wonderCombos={wonderCombos} />;
      })}
    </svg>
  );
}

export default Hand;
