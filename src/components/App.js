import React, {useState, useCallback, useReducer} from 'react';
import Game from './pages/Game';
import Lobby from './pages/Lobby';
import Waiting from './pages/Waiting';
import MessageDiv from './MessageDiv';
import useGameSocket from './../hooks/useGameSocket';

const INITIAL_STATE = {
  game: {},
  games: [],
  player: {},
  players: [],
  hand: [],
  playersInfo: [],
  status: 'lobby'
};

const reducer = (state, action) => {
  console.log('reducing', state, action);
  if (action.messageType === 'myInfo') {
    const player = {name: action.name, id: action.id, inGame: action.inGame};
    localStorage.setItem(`_swID_${action.name}`, action.id);
    return {...state, player};
  } else if (action.messageType === 'newGame') {
    const games = state.games.concat(action);
    return {...state, games};
  } else if (action.messageType === 'joinGame') {
    const game = {
      creatorId: action.creatorId,
      id: action.id,
      maxPlayers: action.maxPlayers,
      name: action.name
    };
    return {...state, game, status: 'waiting', players: action.players};
  } else if (action.messageType === 'newPlayer') {
    const players = state.players.concat(action);
    return {...state, players};
  } else {
    console.warn('Unhandled message', action);
    return state;
  }
};

function App() {
  const [gameState, handleMessage] = useReducer(reducer, INITIAL_STATE);
  const parseMessage = useCallback((msg) => {
    try {
      handleMessage(JSON.parse(msg.data));
    } catch (e) {
      console.warn('Error in handling message', msg, e);
    }
  }, handleMessage);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('info');
  const displayMessage = ({text, type = 'info'}) => {
    setMessage(text);
    setMessageType(type);
  };
  const onError = (error) => {
    displayMessage({text: `ERROR: I'm sorry, something went wrong!`, type: 'error'});
    console.error(error);
  };
  const callbackMap = {
    //wonderOption
    //playOrder
    //sideChosen
    //hand
    //playCombos
  };
  const [login, sendMessage] = useGameSocket({displayMessage, parseMessage});
  return (
    <div className='App'>
      <div className="w-10/12 mx-auto">
        <MessageDiv text={message} type={messageType} dismissMessage={() => setMessage('')} />
      </div>
      <Lobby login={login} sendMessage={sendMessage} displayMessage={displayMessage} games={gameState.games} />
      <Waiting players={gameState.players} {...gameState.game} />
      <Game />
    </div>
  );
}

export default App;
