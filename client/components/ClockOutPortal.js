import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';


const ClockOutPortal = (props) => {
  const navigate = useNavigate();
  const { first_name, viewTimesheet, handleClockOut, startTime, setExtrasView, setCurrentEmployee } = props;

  return (
      <Card style={{width: '70%', padding: '10px'}}>
        <Card.Body>
          <Card.Title>Welcome back {first_name}</Card.Title>
          <Card.Text> You've been clocked in since {startTime}. Are you ready to clock out? </Card.Text> 
            <Button className='button' variant="secondary" onClick={() => handleClockOut()}>Clock Out</Button>
            <Button className='button' variant="secondary" onClick={viewTimesheet}>View Timesheet</Button>
            <Button className='button' variant="warning" 
              onClick={() =>{
                setCurrentEmployee(null);
                navigate('/');
              } 
            }>Exit</Button>  
            <Button className='button' variant="primary" 
              onClick={() => {
                setExtrasView('tips')
                navigate('/employeeportal/addtips')
              }}>Add Tips/Extras</Button>  
        </Card.Body>
      </Card>
  )
};

export default ClockOutPortal;