import React from 'react';

const Separator = ({color = 'gray-400', margin = '4'}) => {
  const cn = `my-${margin} w-full border-b-2 border-${color}`;
  return <hr className={cn} />;
};

export default Separator;
