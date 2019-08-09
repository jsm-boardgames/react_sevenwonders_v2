import React from 'react';
import Game from './pages/Game';
import Lobby from './pages/Lobby';

function App() {
  return (
    <div className='App'>
      <div className="w-full">
        <div className="p-3 rounded mt-3 mb-3 w-3/4 mx-auto bg-blue-200 text-blue-700">Some important message for you!</div>
      </div>
      <Lobby />
      <Game />
    </div>
  );
}

export default App;
