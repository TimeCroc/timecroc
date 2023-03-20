import React from 'react';

const SubmitButton = (props) => {

  return (
    <div>
      <button className='submit_button' onClick={props.clicked}>      
        {'>'}
      </button>
    </div>
  )
}

export default SubmitButton;