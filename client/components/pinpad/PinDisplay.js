import React from 'react';

const PinDisplay = (props) => {

  return (
    <div className='pin-display'>
      <h1>{props.val}</h1>
    </div>
  )

}

export default PinDisplay;