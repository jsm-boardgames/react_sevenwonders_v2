import React from 'react';
import GameBadge from './GameBadge';
import Resource from './Resource';

const PlayerSummary = ({
    playerName = '',
    coins = 0,
    military = 0,
    stagesInfo = [],
    wonderSide = 'a',
    wonderName = '',
    wonderResource = '',
    cardsPlayed = [],
    scienceValues = [],
}) => {
  const stage = stagesInfo.filter(s => s.isBuilt).length;
  const stageNum = stage === 4 ? 'IV' : 'I'.repeat(stage);
  const wonderDisplay = stage === 0 ?
      `${wonderName} side: ${wonderSide}` :
      `${wonderName} side: ${wonderSide} stage: ${stageNum}`;
  const resourceInfo = cardsPlayed.filter(card => card.isResource)
      .reduce((acc, card) => {
        const resType = card.type === 'commercial' ? 'nonBuyable' : card.type;
        if (acc[resType] == null) {
          acc[resType] = [card.value];
        } else {
          acc[resType].push(card.value);
        }
        return acc;
      }, {nonBuyable: [wonderResource],});
  // get alexandria's built resources from wonder
  resourceInfo.nonBuyable.push(...stagesInfo.filter(s => s.isBuilt)
      .filter(s => s.resource != null)
      .map(s => s.resource));
  const scienceBadges = scienceValues.map((sv, idx) => <GameBadge type='science' value={sv} key={idx} />)
  const formattedCoins = `$${coins}`;
  const milStr = cardsPlayed.filter(({type}) => type === 'military')
      .reduce((acc, curr) => acc + curr.value, 0) +
        stagesInfo.filter(s => s.isBuilt)
          .filter(s => s.military != null)
          .reduce((acc, curr) => acc + curr.military, 0);
  const milInfo = `Military -- Strength: ${milStr} Victory Points: ${military}`;
  const resourceOrder = {
    nonBuyable: 0,
    naturalResource: 1,
    manufacturedResource: 2,
  };
  const resourceDivs = Object.entries(resourceInfo)
      .sort(([typeA, valuesA], [typeB, valuesB]) => resourceOrder[typeA] - resourceOrder[typeB])
      .map(([type, values], idx) => <div key={type}>{type}: {values.map((res, resIdx) => <Resource key={resIdx} resource={res} />)}</div>);
  return (
    <div className='w-full flex flex-col bg-blue-200 m-2 p-4 rounded-lg'>
      <div>{wonderDisplay}</div>
      <div>{milInfo}</div>
      <div>Sciences: {scienceBadges}</div>
      {resourceDivs}
    </div>
  );
};

export default PlayerSummary;
