import React from 'react';

function Hand() {
  const maxCards = 7;
  const cardClasses = ['sw-military-card', 'sw-cultural-card', 'sw-natural-resource-card'];
  const svgWidth = 800;
  const viewBox = `0 0 ${svgWidth} ${svgWidth}`;
  return (
    <svg viewBox={viewBox} xmlns='http://www.w3.org/2000/svg'>
      {[0,1,2,3,4,5, 6].map((idx, _, arr) => {
        const midway = (arr.length - 1) / 2;
        const rotate = `rotate(${10 * (idx - midway)} 400 200)`;
        const cn = `sw-card ${cardClasses[idx % 3]}`;
        return (
        <React.Fragment key={idx}>
          <g className={cn} transform={rotate}>
            <rect x={325 + (60 * (idx - midway))} y='30' width='150' height='220' />
            <text x={330 + (60 * (idx - midway))} y='45' textLength="90" className='text-sm'>I'm #{idx}</text>
          </g>
        </React.Fragment>
      )
      })}
    </svg>
  );
}

export default Hand;
