import React, { Fragment, useRef, useEffect } from 'react';

// sensible default? id is the name, type is text
// use destructuring of the props
// TODO how to get auto-fill to work with it?
const Input = ({name, value, onChange, hasFocus = false, label = name, type = 'text', htmlAttributes = {}}) => {
  const inputEl = useRef(null);
  const id = `${name}-${Date.now()}`;
  useEffect(() => {
    if (hasFocus) {
      inputEl.current.focus();
    }
  }, [hasFocus]);
  return (
    <Fragment>
      <div className='w-full md:w-1/3'>
        <label htmlFor={id} className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-6'> 
          {label}
        </label>
      </div>
      <div className='w-full md:w-2/3'>
        <input ref={inputEl} id={id} type={type} onChange={onChange} value={value} name={name} {...htmlAttributes} className='appearance-none border-2 boder-gray-400 rounded focus:outline-none focus:border-blue-400 w-full py-2 px-4 text-gray-700 leading-tight' />
      </div>
    </Fragment>
  );
}

export default Input;
