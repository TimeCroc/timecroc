import React, {useState} from 'react';
import './EditShift.css'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const EditShift = (props) => {
  const [clicked, setClicked] = useState(false)

  function handleClick(){
    setClicked(true);
  }

  if(!clicked){
    return (
      <div>
        <Button onClick={handleClick}>Update Shift</Button> 
      </div>
    )
  }
  else {
    return (
      <div className='update_employee'>
      <h3>Update this shift:</h3>
      <button style={{backgroundColor: 'pink'}} onClick={() => setClicked(false)}><Link to='/currentPayPeriod'>Cancel</Link></button>
    </div>
  );
}
}
export default EditShift;