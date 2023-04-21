import React from 'react';

type Props = {
  val: string
}
const PinDisplay: React.FC<Props> = ({ val }) => {

  return (
    <div className='pin-display'>
      <h1>{val}</h1>
    </div>
  )

}

export default PinDisplay;