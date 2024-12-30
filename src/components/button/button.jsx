import React from "react";

export const Button = ({ onClick, disabled, color = "bg-blue-200 hover:bg-blue-400 disabled:bg-gray-200", children }) => {
  const cn = `mx-2 px-4 py-2 drop-shadow-lg rounded-lg h-max ${color}${disabled ? ' cursor-not-allowed' : ''}`
  return <button type="button" onClick={onClick} disabled={disabled} className={cn}>{children}</button>
};
