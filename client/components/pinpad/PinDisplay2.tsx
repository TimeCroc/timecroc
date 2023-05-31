import React from 'react';

type Props = {
  val: string;
};
const PinDisplay2: React.FC<Props> = ({ val }) => {
  return (
    <div className='pin-display2 pin-pad2'>
      <h2>{val}</h2>
    </div>
  );
};

export default PinDisplay2;
