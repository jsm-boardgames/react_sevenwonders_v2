import React, {useState, useCallback} from 'react';
import Game from './pages/Game';
import Lobby from './pages/Lobby';
import MessageDiv from './MessageDiv';
import useGameSocket from './../hooks/useGameSocket';

function App() {
  const [message, setMessage] = useState('Hey look at me!');
  const [messageType, setMessageType] = useState('info');
  const [games, setGames] = useState([]);
  const displayMessage = ({text, type = 'info'}) => {
    setMessage(text);
    setMessageType(type);
  };
  const onWSError = useCallback((event) => {
    displayMessage({text: `ERROR: I'm sorry, something went wrong with the websocket!`, type: 'error'});
    console.error(event, event.data);
  }, []);
  const onError = useCallback((error) => {
    displayMessage({text: `ERROR: I'm sorry, something went wrong!`, type: 'error'});
    console.error(error);
  }, []);
  const onMessage = useCallback(({data}) => {
    try {
      const parsed = JSON.parse(data);
      console.log('message', parsed);
    } catch (err) {
      onError(err);
    }
  }, []);
  const [login, sendMessage] = useGameSocket({onError, onMessage});
  return (
    <div className='App'>
      <div className="w-10/12 mx-auto">
        <MessageDiv text={message} type={messageType} dismissMessage={() => setMessage('')} />
      </div>
      <Lobby login={login} sendMessage={sendMessage} displayMessage={displayMessage} games={games} />
      <Game />
    </div>
  );
}

export default App;
