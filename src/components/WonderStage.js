import React from 'react';
import Resource from './Resource';
import Separator from './Separator';

const WonderStage = ({stage, cost, points, military, coins, resource, science, custom}) => {
  const stageNum = stage === 4 ? 'IV' : 'I'.repeat(stage);
  return (
    <div className='flex-col border-gray-600 border-l-2 border-t-2 border-r-2 py-4 text-center w-1/5'>
      <div className='mx-auto -mt-8 w-1/2 rounded-full bg-gray-600 text-white text-2xl'>{stageNum}</div>
      <div className='text-xl my-2'>
        Cost: {cost.split('').map((c, i) => <Resource resource={c} key={i} />)}
      </div>
      <Separator />
      <div>
        {points && <span className='bg-blue-400 m-1 px-2 py-1 rounded-lg'>{points}</span>}
        {military && <span className='bg-red-400 m-1 px-2 py-1 rounded-lg'>{military}</span>}
        {coins && <span className='bg-yellow-400 m-1 px-2 py-1 rounded-lg'>{coins}</span>}
        {resource && <Resource resource={resource} />}
        {science && <span className='bg-green-400 m-1 px-2 py-1 rounded-lg'>{science}</span>}
        {custom && <span className='bg-blue-400 m-1 px-2 py-1 rounded-lg'>{custom}</span>}
      </div>
    </div>
  );
};

export default WonderStage;
