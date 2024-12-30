import React from 'react';

// my-4 border-gray-400
const Separator = ({color = 'gray-400', margin = '4'}) => {
  const cn = `my-${margin} w-full border-l-2 border-${color}`;
  return <hr className={cn} />;
};

export default Separator;
