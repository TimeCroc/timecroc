import React from 'react';
import './NumButton.css';

type Props = {
  clicked: () => void
  num: string|number
  key: string
}

const NumButton: React.FC<Props> = ({ clicked, num }) => {
  return (
    <div >
      <button className='num_button' onClick={clicked}>{num}</button>
    </div>
  );
  }
  
  export default NumButton;