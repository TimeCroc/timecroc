import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserClock } from '@fortawesome/free-solid-svg-icons';
import '../css/styles.css'

const ClockInPortal = (props) => {
  const navigate = useNavigate();
  const { first_name, handleClockIn, viewTimesheet, setCurrentEmployee} = props;

  return (
      <Card style={{width: '70%', padding: '0px'}}>
        <Card.Body>
          <Card.Title>Welcome to work {first_name}</Card.Title>
          <Card.Text> It's time to clock in for your shift! </Card.Text> 
            <Button className='button' variant="primary" onClick={()=> handleClockIn()}><FontAwesomeIcon icon={faUserClock} className="white-icon" size="lg"/>   Clock In
            </Button>
            <Button className='button' variant="secondary" onClick={viewTimesheet}>View Timesheet</Button>
            <Button 
              className='button' 
              variant="warning" 
              color="error" 
              onClick={() => {
                setCurrentEmployee(null);
                navigate('/');
              }
            }>Exit</Button>    
        </Card.Body>
      </Card>
  )
};

export default ClockInPortal;