import React from 'react';

// type: play or build wonder
const PlayCombo = ({self, clockwise, counterClockwise, onClick, type = 'play'}) => {
  if (clockwise.cost === 0 && counterClockwise.cost === 0) {
    if (self.cost === 0) {
      return <div className='w-full text-large'><button  onClick={onClick} className='m-4 bg-blue-200 hover:bg-blue-400'>Choose</button>This card is free to {type}</div>;
    } else {
      return <div className='w-full text-large'><button  onClick={onClick} className='m-4 bg-blue-200 hover:bg-blue-400'>Choose</button>This card requires you to pay {self.cost} to {type}</div>;
    }
  } else {
    return <div className='w-full text-large'><button onClick={onClick} className='m-4 bg-blue-200 hover:bg-blue-400'>Choose</button>Pay {clockwise.cost} clockwise for {clockwise.count} resources and {counterClockwise.cost} counter clockwise for {counterClockwise.count} resources, in order to {type}</div>;
  }
};

export default PlayCombo;
