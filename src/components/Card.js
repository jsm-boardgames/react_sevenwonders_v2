import React from 'react';
import Separator from './Separator';
import PlayCombo from './PlayCombo';
import Resource from './Resource';

const CARD_CLASSES = {
  red: 'sw-military-card',
  blue: 'sw-civilian-card',
  brown: 'sw-natural-resource-card',
  grey: 'sw-manufactured-resource-card',
  green: 'sw-science-card',
  purple: 'sw-guild-card',
  yellow: 'sw-commercial-card'
};
const Card = ({name, players, playCombos, value, cost, svgAttributes = {}, x = 0, y = 0, color, sendMessage, setOverlayChildren, wonderCombos}) => {
  const getWonderCombos = () => {
    if (wonderCombos == null) {
      return <div className='w-full'>Loading potential wonder build, please check back later</div>;
    } else if (wonderCombos.length === 0) {
      return <div className='w-full'>Regrettably, you are unable to afford to build your next wonder stage at this time</div>;
    } else {
      return <div className='w-full'>{wonderCombos.map((wc, i) => <PlayCombo key={i} onClick={() => {sendMessage({messageType: 'buildWonder', card: {name, players}, clockwise: wc.clockwise, counterClockwise: wc.counterClockwise, self: wc.self}); setOverlayChildren(null); }} {...wc} type='build wonder' />)}</div>;
    }
  };
  const onClick = (e) => {
    const formattedCombos = (playCombos != null && playCombos.length > 0) ?
      <div className='w-full'>{playCombos.map((pc, i) => <PlayCombo key={i} onClick={() => {sendMessage({messageType: 'playCard', card: {name, players}, clockwise: pc.clockwise, counterClockwise: pc.counterClockwise, self: pc.self}); setOverlayChildren(null); }} {...pc} />)}</div> :
      <div className='w-full'>It is not possible for you to play this card</div>;
    setOverlayChildren && playCombos != null && setOverlayChildren((
      <div className='flex'>
        <svg viewBox='0 0 150 220' xmlns='http://www.w3.org/2000/svg' className='h-screen-50 w-1/2'>
          <Card name={name} value={value} cost={cost} color={color} sendMessage={sendMessage} />
        </svg>
        <div className='w-1/2 flex-col'>
          {formattedCombos}
          <Separator />
          {getWonderCombos()}
          <Separator />
          <div className='w-full'><button onClick={() => {sendMessage({messageType: 'discardCard', card: {name, players}}); setOverlayChildren(null);}} className='m-4 bg-blue-200 hover:bg-blue-400'>Choose</button>Discard this card to gain 3 gold!</div>
        </div>
      </div>
    ));
  };
  const cn = `sw-card ${CARD_CLASSES[color]}${!setOverlayChildren || playCombos == null ? '' : ' cursor-pointer'}`;
  return (
    <g className={cn} {...svgAttributes} onClick={onClick}>
      <rect x={x} y={y} width='150' height='220' />
      <text x={x + 5} y={y + 15} textLength="90" className='text-sm'>{name}</text>
      <foreignObject x={x + 5} y={y + 30} width='140' height='190'>
        <div>Cost: {cost && cost.split('').map((r,i) => <Resource resource={r} key={i} />)}</div>
        <Separator />
        <div>Value: {value}</div>
      </foreignObject>
    </g>
  );
};

export default Card;
