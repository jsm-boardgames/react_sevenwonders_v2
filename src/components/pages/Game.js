import React from 'react';
import Hand from './../Hand';

function App() {
  return (
    <div className='w-full h-full'>
      <div className="w-1/4 inline">Info here about who's in the game</div>
      <div className="w-3/4 inline float-right">
        <Hand />
      </div>
    </div>
  );
}

export default App;
