import React, {useState, useCallback, useReducer} from 'react';
import Game from './pages/Game';
import EndGame from './pages/EndGame';
import Lobby from './pages/Lobby';
import Waiting from './pages/Waiting';
import ChooseSide from './pages/ChooseSide';
import MessageDiv from './MessageDiv';
import Overlay from './Overlay';
import useGameSocket from './../hooks/useGameSocket';

const INITIAL_STATE = {
  game: {},
  games: [],
  player: {},
  players: [],
  hand: [],
  possibleCards: [],
  playersInfo: {},
  playerInfo: {},
  canPlay: true,
  status: 'lobby',
  wonderOption: {},
  wonderCombos: [],
  wonders: [],
  playOrder: [],
  direction: 'left',
  systemMessage: '',
  systemMessageType: 'info',
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
  } else if (action.messageType === 'wonderOption') {
    return {...state, wonderOption: action.wonderOption, status: 'chooseSide'};
  } else if (action.messageType === 'sideChosen') {
    const wonders = state.wonders.concat({...action.wonder, playerId: action.playerId});
    const status = wonders.length === state.players.length ? 'playing' : state.status;
    return {...state, wonders, status};
  } else if (action.messageType === 'playOrder') {
    return {...state, playOrder: action.playOrder, direction: action.direction};
  } else if (action.messageType === 'canPlay') {
    return {...state, canPlay: action.value};
  } else if (action.messageType === 'hand') {
    return {...state, possibleCards: [], hand: action.hand, wonderCombos: []};
  } else if (action.messageType === 'playCombos') {
    const hand = state.hand.map((card) => {
      return card.name === action.card.name && card.players === action.card.players ?
        {...card, playCombos: action.card.playCombos} :
        {...card};
    });
    return {...state, hand};
  } else if (action.messageType === 'wonderCombos') {
    return {...state, wonderCombos: action.combos};
  } else if (action.messageType === 'playersInfo') {
    return {...state, playersInfo: action.playersInfo, playerInfo: action.playersInfo[state.player.id]};
  } else if (action.messageType === 'ranking') {
    return {...state, ranking: action.ranking, status: 'finished'};
  } else if (action.messageType === 'systemMessage') {
    const systemMessageType = action.messageType || 'info';
    return {...state, systemMessage: action.message, systemMessageType,}; 
  } else if (action.messageType === 'freeWonderPlay') {
    return {...state, possibleCards: action.possibleCards};
  } else if (action.messageType === 'reconnect') {
    const status = !!state.playersInfo ? 'playing' : 'waiting';
    return { ...state, status };
  } else if (action.messageType === 'disconnected') {
    return { ...state, status: 'disconnected' };
  } else {
    console.warn('Unhandled message', action);
    return state;
  }
};

export function App() {
  const [gameState, handleMessage] = useReducer(reducer, INITIAL_STATE);
  const [overlayChildren, setOverlayChildren] = useState(null);
  const parseMessage = useCallback((msg) => {
    try {
      console.log('try to parse');
      handleMessage(JSON.parse(msg.data));
    } catch (e) {
      console.warn('Error in handling message', msg, e);
    }
  }, [handleMessage]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('info');
  const displayMessage = ({text, type = 'info'}) => {
    setMessage(text);
    setMessageType(type);
  };
  const [login, sendMessage] = useGameSocket(displayMessage, parseMessage);
  const getPage = () => {
    if (gameState.status === 'lobby') {
      return <Lobby login={login} sendMessage={sendMessage} displayMessage={displayMessage} games={gameState.games} />
    } else if (gameState.status === 'waiting') {
      return <Waiting sendMessage={sendMessage} players={gameState.players} {...gameState.game} />
    } else if (gameState.status === 'chooseSide') {
      return <ChooseSide sendMessage={sendMessage} {...gameState.wonderOption} maxPlayers={gameState.game.maxPlayers} wonders={gameState.wonders} />
    } else if (gameState.status === 'playing') {
      return <Game setOverlayChildren={setOverlayChildren}
          sendMessage={sendMessage}
          hand={gameState.hand}
          possibleCards={gameState.possibleCards}
          playersInfo={gameState.playersInfo}
          playerInfo={gameState.playerInfo} 
          playOrder={gameState.playOrder}
          wonders={gameState.wonders}
          direction={gameState.direction}
          canPlay={gameState.canPlay}
          wonderCombos={gameState.wonderCombos} />
    } else if (gameState.status === 'finished') {
      return <EndGame setOverlayChildren={setOverlayChildren}
          playersInfo={gameState.playersInfo}
          playOrder={gameState.playOrder}
          ranking={gameState.ranking} />
    } else if (gameState.status === 'disconnected') {
      return (<>
        <h1>You have been disconnected. Please reconnect.</h1>
        <button onClick={() => login(gameState.player.name)} type="button">reconnect</button>
        </>);
    } else {
      displayMessage({text: 'ERROR! Unhandled game state.', type: 'error'});
      return null;
    }
  }
  return (
    <>
      {overlayChildren && <Overlay dismiss={() => setOverlayChildren(null)}>{overlayChildren}</Overlay>}
      <div className='App h-screen'>
        <div className="w-10/12 mx-auto">
          <MessageDiv text={gameState.systemMessage} type={gameState.systemMessageType} dismissMessage={() => {handleMessage({messageType: 'systemMessage', message: ''})}} />
          <MessageDiv text={message} type={messageType} dismissMessage={() => setMessage('')} />
        </div>
        {getPage()}
      </div>
    </>
  );
}
