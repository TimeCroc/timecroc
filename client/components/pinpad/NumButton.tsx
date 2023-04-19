import React from 'react';

type Props = {
  clicked: () => void
  num: string|number
  key: string
}

const NumButton: React.FC<Props> = ({ clicked, num, key }) => {
  return (
    <div >
      <button className='num_button' onClick={clicked}>{num}</button>
    </div>
  );
  }
  
  export default NumButton;