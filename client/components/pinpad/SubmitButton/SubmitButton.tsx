import React from 'react';
import './SubmitButton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';

type Props = {
  clicked: () => void
}

const SubmitButton: React.FC<Props> = ({ clicked }) => {
  return (
    <div>
      <button className='submit_btn' onClick={clicked}> 
      <FontAwesomeIcon icon={faArrowRightToBracket} size="lg" />      {/* <FontAwesomeIcon icon={faRightToBracket} style={{ color: "#f7f7f7" }} size={lg}/>  */}
      </button>
    </div>
  );
}

export default SubmitButton;