import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import logo from '../logo.jpg';
import { useNavigate } from 'react-router-dom';

// type Props = {
//   first_name: string,
//   viewTimesheet: () => void,
//   handleClockOut: () => void,
// }

const ClockOutPortal = (props) => {
  const navigate = useNavigate();
  const { first_name, viewTimesheet, handleClockOut, startTime, setExtrasView } = props;

  return (
      <Card style={{width: '70%', padding: '10px'}}>
        <Card.Img variant="top" src={logo} style={{width: '60%', padding: '10px'}}/>
        <Card.Body>
          <Card.Title>Welcome back {first_name}</Card.Title>
          <Card.Text> You've been clocked in since {startTime}. Are you ready to clock out? </Card.Text> 
            {/* <Button className='button' variant="secondary"onClick={() => setExtrasView(true)}> Add tips or Misc.</Button> */}
            <Button className='button' variant="secondary" onClick={() => handleClockOut()}>Clock Out</Button>
            <Button className='button' variant="secondary" onClick={viewTimesheet}>View Timesheet</Button>
            <Button className='button' variant="secondary" onClick={() => navigate('/')}>Back</Button>  
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