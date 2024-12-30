import React from 'react';
import Separator from './Separator';
import PlayCombo from './PlayCombo';
import Resource from './Resource';
import { Button } from '../components/button/button';

/**
* going to trick tailwind maybe
* bg-red-400 bg-blue-400 bg-brown-400 bg-gray-400 bg-green-400 bg-purple-400 bg-yellow-400
* bg-red-200 bg-blue-200 bg-brown-200 bg-gray-200 bg-green-200 bg-purple-200 bg-yellow-200
**/
const CARD_CLASSES = {
  red: 'sw-military-card',
  blue: 'sw-civilian-card',
  brown: 'sw-natural-resource-card',
  gray: 'sw-manufactured-resource-card',
  green: 'sw-science-card',
  purple: 'sw-guild-card',
  yellow: 'sw-commercial-card'
};
const Card = ({next, prev, name, players, playCombos = [], value, cost, svgAttributes = {}, x = 0, y = 0, color, sendMessage, setOverlayChildren, wonderCombos, olympiaFreeBuild}) => {
  const getWonderCombos = () => {
    if (wonderCombos == null) {
      return <div className='w-full'>Loading potential wonder build, please check back later</div>;
    } else if (wonderCombos.length === 0) {
      return <div className='w-full'><Button  disabled>Build Wonder</Button></div>;
    } else {
      return <div className='w-full flex-col'>{wonderCombos.map((wc, i) => <PlayCombo key={i} onClick={() => {sendMessage({messageType: 'buildWonder', card: {name, players}, clockwise: wc.clockwise, counterClockwise: wc.counterClockwise, self: wc.self}); setOverlayChildren(null); }} {...wc} type='Build Wonder' />)}</div>;
    }
  };
  const onClick = (e) => {
    const formattedCombos = (olympiaFreeBuild || playCombos.length > 0) ?
        (
          <div className='w-full flex flex-col'>
            {playCombos.map((pc, i) => <PlayCombo
                key={i}
                onClick={() => {
                  sendMessage({messageType: 'playCard', card: {name, players}, clockwise: pc.clockwise, counterClockwise: pc.counterClockwise, self: pc.self});
                  setOverlayChildren(null);
                }}
                {...pc} />
            )}
            {olympiaFreeBuild && <div className='w-full text-large'><Button onClick={() => {sendMessage({messageType: 'useOlympia', card: {name, players}}); setOverlayChildren(null);}}>Once per Age Build</Button></div>}
          </div>
        ) :
        <div className='w-full'><Button disabled>Play</Button></div>;
    setOverlayChildren && setOverlayChildren((
      <div className='flex'>
      <div className='flex flex-col'>
        <svg viewBox='0 0 150 220' xmlns='http://www.w3.org/2000/svg' className='h-screen-50 w-1/2'>
          <Card name={name} value={value} cost={cost} color={color} sendMessage={sendMessage} />
        </svg>
        <div className='w-1/2 flex'>
          {formattedCombos}
          {getWonderCombos()}
          <div className='w-full'><Button onClick={() => {sendMessage({messageType: 'discardCard', card: {name, players}}); setOverlayChildren(null);}}>Discard</Button></div>
        </div>
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
        <div>Cost: 
          <div className='flex flex-wrap'>
            {cost && cost.split('').map((r,i) => <Resource resource={r} key={i} />)}
          </div>
        </div>
        <Separator />
        <div>Value: {value}</div>
      </foreignObject>
    </g>
  );
};

export default Card;
