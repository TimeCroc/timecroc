import React from 'react';

const BackButton = (props) => {

  return (
    <div>
      <button className='back_button' onClick={props.clicked}> {'<'} </button>
    </div>
  )
}

export default BackButton;