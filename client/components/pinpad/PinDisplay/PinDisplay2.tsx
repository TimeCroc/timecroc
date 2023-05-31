import React from 'react';
import './PinDisplay2.css';

type Props = {
  val: string
}
const PinDisplay2: React.FC<Props> = ({ val }) => {

  return (
    // changed this className to pin-display to reflect the css file
    <div className='pin-display2'>
      <h1>{val}</h1>
    </div>
  )

}

export default PinDisplay2;