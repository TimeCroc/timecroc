import React from 'react';

type Props = {
  clicked: () => void
}

const SubmitButton = ({ clicked }) => {

  return (
    <div>
      <button className='submit_button' onClick={clicked}>      
        {'>'}
      </button>
    </div>
  );
}

export default SubmitButton;