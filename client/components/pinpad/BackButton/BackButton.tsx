import React from 'react'
import './BackButton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';

type Props = {
  clicked: () => void
}

const BackButton: React.FC<Props> = ({ clicked }) => {
  return (
    <div>
      <button className='back_button' onClick={clicked}>
      <FontAwesomeIcon icon={faDeleteLeft} style={{ transform: "scale(1.2)", WebkitTextStroke: 1, color: 'white'}}  />
 </button>
    </div>
  )
}

export default BackButton;