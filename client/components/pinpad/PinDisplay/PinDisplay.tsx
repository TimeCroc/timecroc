import React from 'react';
import './PinDisplay.css';

type Props = {
  val: string
}
const PinDisplay: React.FC<Props> = ({ val }) => {

  return (
    // changed this className to pin-display to reflect the css file
    <div className='pin-display'>
      <h1>{val}</h1>
    </div>
  )

}

export default PinDisplay;