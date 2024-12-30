import React from 'react';
import { Button } from '../components/button/button';

// type: play or build wonder
const PlayCombo = ({self, clockwise, counterClockwise, onClick, type = 'Play'}) => {
  if (clockwise.cost === 0 && counterClockwise.cost === 0) {
    if (self.cost === 0) {
      return <div className='w-full text-large'><Button  onClick={onClick}>{type}</Button></div>;
    } else {
      return <div className='w-full text-large'><Button  onClick={onClick}>Pay {self.cost} to {type}</Button></div>;
    }
  } else {
    return <div className='w-full text-large'><Button onClick={onClick}>Pay to {type}</Button>Pay {clockwise.cost} clockwise and {counterClockwise.cost} counter clockwise</div>;
  }
};

export default PlayCombo;
