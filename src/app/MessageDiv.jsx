import React from 'react';

const MessageDiv = ({text, dismissMessage, type = 'error'}) => {
  const colorMap = {error: 'red', info: 'blue', warning: 'yellow'};
  const color = colorMap[type] || 'blue';
  const className = `w-full shadow-md rounded m-6 bg-${color}-200 text-${color}-700 border-2 border-${color}-500 text-lg p-2`;
  return text != null && text.length > 0 && (
    <div className={className}>
      <div className={dismissMessage ? 'w-11/12 inline-block' : 'w-full inline-block'}>{text}</div>
      {dismissMessage && <button className='float-right my-auto h-full' onClick={dismissMessage}>x</button>}
    </div>
  );
}

export default MessageDiv;
