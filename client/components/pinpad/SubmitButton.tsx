import React from 'react';
import "./styles.pinpad.css"
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';

type Props = {
  clicked: () => void
}

const SubmitButton = ({ clicked }) => {

  return (
    <div>
      <button className='submit_button' onClick={clicked}> 
      <FontAwesomeIcon icon={faArrowRightToBracket} size="lg" className="fa-thin" />      {/* <FontAwesomeIcon icon={faRightToBracket} style={{ color: "#f7f7f7" }} size={lg}/>  */}
      </button>
    </div>
  );
}

export default SubmitButton;