import React, { Fragment, useState } from 'react';
import Input from './../Input';
import Separator from './../Separator';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showValidation: false
    };
    this.inputRef = React.createRef();

    this.onSubmit = this.onSubmit.bind(this);
  }

  render() {
    return (
      <form onSubmit={this.onSubmit} className={this.state.showValidation ? 'was-validated' : ''}>
        <div className='form-group'>
          <div className='input-group mb-4'>
            <div className='input-group-prepend'>
              <span className='input-group-text bg-secondary text-white'>Name:</span>
            </div>
            <input ref={this.inputRef} type='text' name='name' className='form-control' required />
            <div className='input-group-append'>
            <button type='submit' className='w-1/5 rounded-lg mx-4 bg-blue-400 text-blue-700'>Submit</button>
            </div>
          </div>
        </div>
      </form>
    );
  }

  componentDidMount() {
    if (this.props.hasFocus) {
      this.inputRef.current.focus();
    }
  }

  componentDidUpdate() {
    if (this.props.hasFocus) {
      this.inputRef.current.focus();
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({showValidation: true});
    if (e.target.checkValidity()) {
      let data = new FormData(e.target);
      this.props.login(data.get('name'));
    } else {
      return;
    }
  }
}

const CreateGame = (props) => {
  const [gameName, setGameName] = useState('');
  const [players, setPlayers] = useState(3);
  const onSubmit = (e) => {
    e.preventDefault();
    if (e.target.checkValidity()) {
      console.log('valid!');
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
          <Input name='gameName' value={gameName} onChange={(e) => setGameName(e.target.value)} label='Game Name' htmlAttributes={{required: true}} />
        </div>
        <div className='m-4 flex'>
          <Input name='players' value={players} onChange={(e) => setPlayers(e.target.value)} label='Players' htmlAttributes={{required: true, min: '3', max: '7'}} type='number' />
        </div>
        <div className='mb-4 my-4 flex justify-center'>
          <button type='submit' className='h-12 w-1/5 rounded-lg mx-4 bg-blue-400 text-blue-700'>Start Game</button>
        </div>
      </form>
    </div>
  );
}

class OpenGame extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  render() {
    return (
      <button className='m-4 bg-gray-400 h-12 border-4 text-center hover:border-blue-400 rounded-lg' onClick={this.onClick}>
        {this.props.name} - {this.props.creatorName} ({this.props.maxPlayers})
      </button>
    );
  }

  onClick(e) {
    console.log('click click click');
  }
}

class OpenGames extends React.Component {
  render() {
    let sendMessage = this.props.sendMessage;
    const gamesList = /*this.props.games*/[
      {id: 1, name: 'game 1', creatorName: 'bob', maxPlayers: 5},
      {id: 2, name: 'game 2', creatorName: 'jane', maxPlayers: 3}
    ].map(g => <OpenGame {...g} sendMessage={sendMessage} key={g.id} />);
    return <Fragment>{gamesList}</Fragment>;
  }
}


function Lobby(props) {
  const [name, setName] = useState('');
  const onLogin = (e) => {
    e.preventDefault();
    console.log('well interesting...');
  };
  return (
      <div>
        <div className='bg-gray-200 container mx-auto rounded-lg'>
          <h1 className='text-center text-3xl my-4'>Seven Wonders</h1>
          <div className='text-center'>
            <p>Created by Antoine Bauza, published by Repos Productions</p>
          </div>
          <Separator color='gray-400' margin='4' />
          <form onSubmit={onLogin} className='flex py-10'>
            <Input name='name' value={name} htmlAttributes={{required: true}} onChange={(e) => setName(e.target.value)} hasFocus={!name} />
            <button type='submit' className='w-1/5 rounded-lg mx-4 bg-blue-400 text-blue-700'>Submit</button>
          </form>
        </div>
        <div className={!!name ? 'container flex my-4 mx-auto' : 'container flex my-4 mx-auto hidden'}>
          <div className='w-1/2 mx-4 bg-gray-200 rounded-lg'>
            <CreateGame sendMessage={props.sendMessage} hasFocus={props.name != null} />
          </div>
          <div className='w-1/2 mx-4 bg-gray-200 rounded-lg'>
            <div className='flex flex-col'>
              <div className='text-xl text-center mt-3'>Open Games</div>
              <Separator color='gray-400' margin='4' />
              <OpenGames games={props.games} sendMessage={props.sendMessage} />
            </div>
          </div>
        </div>
      </div>
  );
}

export default Lobby;
