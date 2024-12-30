import React, {useState} from 'react';
import Separator from './../Separator';
import WonderSide from './../WonderSide';

const ChooseSide = ({wonderName, wonderSides = [], wonders = [], maxPlayers, sendMessage}) => {
  const [chosenSide, setChosenSide] = useState(wonders.filter(s => s.wonderName === wonderName)[0]);
  const chooseSide = (side) => {
    setChosenSide(wonderSides.filter(s => s.side === side)[0]);
    sendMessage({messageType: 'wonderSide', side, wonderName});
  };
  const wonderOptions = !chosenSide ?
    wonderSides.map((side) => {
      return (
        <div key={side.side} className='cursor-pointer my-12 bg-blue-200 rounded-lg hover:bg-blue-300 hover:border-blue-600 border-2' onClick={() => chooseSide(side.side)}>
          <WonderSide wonderName={wonderName} {...side} />
        </div>
      );
    }) :
    <WonderSide wonderName={wonderName} {...chosenSide} />;

  return (
    <div className='bg-gray-200 container mx-auto rounded-lg'>
      <h1 className='text-center text-3xl my-4'>You've been given {wonderName}</h1>
      <div className='text-center'>
        <p>Choose which side of the board you would like to play. Game begins when all players have chosen ({wonders.length} of {maxPlayers})</p>
      </div>
      <Separator color='gray-400' margin='4' />
      <div className='flex-col'>
        {wonderOptions}
      </div>
    </div>
  );
};

export default ChooseSide;
