import React from 'react';
import CardHtml from './CardHtml';

const FreePlays = ({possibleCards, sendMessage}) => {
  const cards = possibleCards.map(c => <div key={c.name + c.players} className='border-white border-2 hover:border-black p-1 cursor-pointer' onClick={() => sendMessage({messageType: 'freePlayChosen', card: c})}><CardHtml {...c} /></div>);
  return (
    <div className='w-full p-12'>
      <div className='w-full text-center text-3xl bg-blue-400 border-blue-600 border-2'>
        You are allowed to pick one card to play for free! Choose wisely!
      </div>
      <div className='w-full flex flex-wrap'>
        {cards}
      </div>
    </div>
  );
};

export default FreePlays;
