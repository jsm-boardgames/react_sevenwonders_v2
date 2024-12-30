import React from 'react';
import Resource from './Resource';
import Separator from './Separator';
import WonderStage from './WonderStage';

const WonderSide = ({wonderName, side, resource, stages = []}) => {
  return (
    <div className='pt-2 rounded-lg'>
      <div className='flex'>
        <div className='text-xl flex-grow-0'>
          <Resource resource={resource} />
        </div>
        <div className='text-2xl flex-1'>{wonderName} - {side}</div>
      </div>
      <Separator />
      <div className='mt-12 flex justify-around'>
        {stages.map(s => <WonderStage key={s.stage} {...s} />)}
      </div>
    </div>
  );
};

export default WonderSide;
