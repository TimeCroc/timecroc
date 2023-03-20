import React from 'react';

const NumButton = (props) => {
  const { num } = props;
  return (
    <div >
      <button className='num_button' onClick={props.clicked}>{num}</button>
    </div>
  )
  }
  
  export default NumButton;