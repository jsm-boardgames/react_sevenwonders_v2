import React from 'react';

function App() {
  const svgWidth = 1000;
  const maxCards = 7;
  const cardClasses = ['sw-military-card', 'sw-cultural-card', 'sw-natural-resource-card'];
  const viewBox = `0 0 ${svgWidth} ${svgWidth}`;
  return (
    <div className='App'>
      <header className='App-header'>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
          Learn React
      </header>
      <svg viewBox='0 0 1000 1000' xmlns='http://www.w3.org/2000/svg'>
        {[0,1,2,3,4,5, 6].map((idx, _, arr) => {
          const midway = (arr.length - 1) / 2;
          const rotate = `rotate(${10 * (idx - midway)} 575 200)`;
          const cn = `sw-card ${cardClasses[idx % 3]}`;
          return (
          <React.Fragment key={idx}>
            <g className={cn} transform={rotate}>
              <rect x={500 + (60 * (idx - midway))} y='30' width='150' height='220' />
              <text x={505 + (60 * (idx - midway))} y='45' textLength="90" className='text-sm'>I'm #{idx}</text>
            </g>
          </React.Fragment>
        )
        })}
        <text dx='20' dy='20'>Why hello!</text>
      </svg>
    </div>
  );
}

export default App;
