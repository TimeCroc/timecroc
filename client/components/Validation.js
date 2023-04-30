import React from 'react';
import { Link } from 'react-router-dom';

const Validation = (props) => {
  const { validationMessage, startTime, endTime } = props;

  if(endTime){
    return (
      <div className='validation'>
        <h3>{validationMessage}{endTime}</h3>
        <Link to='/'>Exit</Link>
      </div>
    )
  }

  return (
    <div className='validation'>
      <h3>{validationMessage}{startTime}</h3>
      <Link to='/'>Exit</Link>
    </div>
  )

}

export default Validation;