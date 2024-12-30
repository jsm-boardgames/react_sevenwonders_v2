import React from 'react';

const Overlay = ({children, dismiss}) => {
  const onClickInner = (e) => {
    e.stopPropagation();
  };
  return (
    <div onClick={dismiss} className='sw-overlay top-0 w-screen h-screen fixed'>
      <div onClick={onClickInner} className='bg-white rounded w-3/4 mx-auto my-12 p-12'>
        {children}
      </div>
    </div>
  );
};

export default Overlay;
