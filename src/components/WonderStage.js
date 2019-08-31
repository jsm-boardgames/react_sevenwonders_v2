import React from 'react';
import Resource from './Resource';
import Separator from './Separator';
import GameBadge from './GameBadge';

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
        {points && <GameBadge type='civilian' value={points} />}
        {military && <GameBadge type='military' value={military} />}
        {coins && <GameBadge type='treasury' value={coins} />}
        {resource && <Resource resource={resource} />}
        {science && <GameBadge type='science' value={science} />}
        {custom && <GameBadge type='guild' value={custom} />}
      </div>
    </div>
  );
};

export default WonderStage;
