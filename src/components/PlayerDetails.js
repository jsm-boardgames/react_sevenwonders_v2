import React from 'react';
import GameBadge from './GameBadge';
import Resource from './Resource';
import WonderSide from './WonderSide';
import Separator from './Separator';
import CardHtml from './CardHtml';

const PlayerDetails = ({
    playerName = '',
    coins = 0,
    military = 0,
    stagesInfo = [],
    wonderSide = 'a',
    wonderName = '',
    wonderResource = '',
    cardsPlayed = [],
}) => {
  const stage = stagesInfo.filter(s => s.isBuilt).length;
  const stageNum = stage === 4 ? 'IV' : 'I'.repeat(stage);
  const wonderDisplay = stage === 0 ?
      `${wonderName} side: ${wonderSide}` :
      `${wonderName} side: ${wonderSide} stage: ${stageNum}`;
  const formattedCoins = `$${coins}`;
  const milStr = cardsPlayed.filter(({type}) => type === 'military')
      .reduce((acc, curr) => acc + curr.value, 0) +
        stagesInfo.filter(s => s.isBuilt)
          .filter(s => s.military != null)
          .reduce((acc, curr) => acc + curr.military, 0);
  const milInfo = `Military -- Strength: ${milStr} Victory Points: ${military}`;
  return (
    <div className='w-full flex flex-col m-2 p-4 rounded-lg'>
      <h3 className='text-3xl'>
        {wonderDisplay}
        <GameBadge type='treasury' value={formattedCoins} />
        {milInfo}
      </h3>
      <Separator />
      <article className='flex w-full'>
        {cardsPlayed.sort((c1, c2) => c1.color > c2.color ? 1 : c1.color < c2.color ? -1 : 0).map(c => <CardHtml {...c} key={c.name} />)}
      </article>
      <article className='bg-blue-200 rounded-lg'>
        <WonderSide wonderName={wonderName} side={wonderSide} resource={wonderResource} stages={stagesInfo} />
      </article>
    </div>
  );
};

export default PlayerDetails;
