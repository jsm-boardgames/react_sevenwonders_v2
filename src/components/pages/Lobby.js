import React, { useState } from 'react';
import Input from './../Input';
import Separator from './../Separator';

const CreateGame = ({sendMessage, hasFocus}) => {
  const [gameName, setGameName] = useState('');
  const [players, setPlayers] = useState(3);
  const onSubmit = (e) => {
    e.preventDefault();
    if (e.target.checkValidity()) {
      sendMessage({
        name: gameName,
        maxPlayers: players,
        messageType: 'newGame'
      });
    } else {
      return;
    }
  }
  return (
    <div className='flex flex-col'>
      <div className='text-xl text-center mt-3'>Start a Game</div>
      <Separator color='gray-400' margin='4' />
      <form onSubmit={onSubmit} className='flex flex-col'>
        <div className='m-4 flex'>
          <Input name='gameName' value={gameName} onChange={(e) => setGameName(e.target.value)} label='Game Name' htmlAttributes={{required: true}} hasFocus={hasFocus} />
        </div>
        <div className='m-4 flex'>
          <Input name='players' value={players} onChange={(e) => setPlayers(e.target.value)} label='Players' htmlAttributes={{required: true, min: '3', max: '7'}} type='number' />
        </div>
        <div className='mb-4 my-4 flex justify-center'>
          <button type='submit' className='h-12 w-1/5 rounded-lg mx-4 bg-blue-400 text-white text-lg border-4 border-blue-200 hover:border-blue-400 hover:bg-blue-700'>Start Game</button>
        </div>
      </form>
    </div>
  );
}

const OpenGame = ({id, name, creatorName, maxPlayers, sendMessage}) => {
  const onClick = () => {
    sendMessage({
      messageType: 'joinGame',
      id: id
    });
  }
  return (
    <button className='m-4 bg-gray-400 h-12 border-4 text-center hover:border-blue-400 rounded-lg' onClick={onClick}>
      {name} - {creatorName} ({maxPlayers})
    </button>
  );

}

const OpenGames = ({games, sendMessage}) => {
  const gamesList = games.map(g => <OpenGame {...g} sendMessage={sendMessage} key={g.id} />);
  return <>{gamesList}</>;
}


const Lobby = ({login, displayMessage, sendMessage, games = []}) => {
  const [name, setName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const onLogin = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setIsLoggedIn(true);
      login(name);
    } else {
      displayMessage({text: 'Already logged in, please reload if you wish to log in with a different alias.', type: 'error'});
    }
  };
  const playerInfo = isLoggedIn ?
      (<div className='text-center py-12 text-lg font-semibold'>{name}</div>) :
      (
        <form onSubmit={onLogin} className='flex py-10'>
          <Input name='name' value={name} htmlAttributes={{required: true}} onChange={(e) => setName(e.target.value)} hasFocus={!name} />
          <button type='submit' className='w-1/5 rounded-lg mx-4 bg-blue-400 text-white text-lg border-4 border-blue-200 hover:border-blue-400 hover:bg-blue-700'>Submit</button>
        </form>
      );
  return (
    <div>
      <div className='bg-gray-200 container mx-auto rounded-lg'>
        <h1 className='text-center text-3xl my-4'>Seven Wonders</h1>
        <div className='text-center'>
          <p>Original boardgame created by Antoine Bauza, published by Repos Productions</p>
          <p>React/Node/Neo4j implementation by Jacob McCrumb</p>
          <p>Note: don't use important personal information as your login</p>
        </div>
        <Separator color='gray-400' margin='4' />
        {playerInfo}
      </div>
      <div className={isLoggedIn ? 'container flex my-4 mx-auto' : 'container flex my-4 mx-auto hidden'}>
        <div className='w-1/2 mx-4 bg-gray-200 rounded-lg'>
          <CreateGame sendMessage={sendMessage} hasFocus={isLoggedIn} />
        </div>
        <div className='w-1/2 mx-4 bg-gray-200 rounded-lg'>
          <div className='flex flex-col'>
            <div className='text-xl text-center mt-3'>Open Games</div>
            <Separator color='gray-400' margin='4' />
            <OpenGames games={games} sendMessage={sendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Lobby;
