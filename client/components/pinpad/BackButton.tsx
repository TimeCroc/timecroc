import React from 'react';

type Props = {
  clicked: () => void
}

const BackButton: React.FC<Props> = ({ clicked }) => {

  return (
    <div>
      <button className='back_button' onClick={clicked}> {'<'} </button>
    </div>
  )
}

export default BackButton;