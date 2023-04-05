import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import logo from '../logo.jpg';
import { useNavigate } from 'react-router-dom';

const ClockInPortal = (props) => {
  const navigate = useNavigate();
  const { first_name, handleClockIn, viewTimesheet} = props;

  return (
      <Card style={{width: '70%', padding: '10px'}}>
        <Card.Img variant="top" src={logo}/>
        <Card.Body>
          <Card.Title>Welcome to work {first_name}</Card.Title>
          <Card.Text> It's time to clock in for your shift! </Card.Text> 
            <Button className='button' variant="primary" onClick={()=> handleClockIn()}>Clock In</Button>
            <Button className='button' variant="secondary" onClick={viewTimesheet}>View Timesheet</Button>
            <Button className='button' variant="secondary" onClick={() => navigate('/')}>Back</Button>    
        </Card.Body>
      </Card>
  )
};

export default ClockInPortal;