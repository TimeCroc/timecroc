import React from 'react';
import './EditShift.css'
import Button from 'react-bootstrap/Button';

const EditShift = (props) => {

  return (
    <div className='edit-shift-container'>
      <h4>Edit Shift Component</h4>
      <Button variant="danger" onClick={()=> props.setEditShift(false)}>Close</Button>
    </div>
  );
}

export default EditShift;