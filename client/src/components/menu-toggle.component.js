import React from 'react';

export const ToggleButton = (props) => {
  console.log('ToggleButton component');
  return (
    <button className="toggle-button" onClick={props.click}>
      <div className="toggle-button-line"></div>
      <div className="toggle-button-line"></div>
      <div className="toggle-button-line"></div>
    </button>
  )
};
