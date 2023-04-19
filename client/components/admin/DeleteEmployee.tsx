import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

type Props = {
  list: {
    pin: string | number
    first_name: string
  }
}

const DeleteEmployee: React.FC<Props> = ({ list }) => {

  const [clicked, updateClicked] = useState<boolean>(false);
  const [validated, setValidated] = useState<boolean>(false);

  // const pin = props.list.pin;
  // const { first_name } = props.list;
  const { pin, first_name } = list;

  function handleClick (){
    fetch(`/api/employees/${pin}`, {
      method: 'DELETE',
    })
    .then(res => res.json())
    .then(data => {
      //console.log('deleted data', data)
    })
    .catch(err => console.log('error:', err));

    setValidated(true);
  }

  if(validated){
    return (
      <div className="admin_validation">
        <h3>{first_name} Deleted</h3>
        <Link to='/admin/list' />
      </div>
    )
  }
  if(!clicked){
    return (
      <div>
        <Button variant="danger" onClick={() => updateClicked(true)}>Delete {first_name} </Button> 
      </div>
    )
  }
  else {
    return (
      <div>
        <h4>Are you sure you want to delete {first_name}?</h4>
        <Button variant="danger" onClick={() => handleClick()}>Delete {first_name} </Button> 
      </div>
    )
  }
}

export default DeleteEmployee;