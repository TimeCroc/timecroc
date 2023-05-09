import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSignOutAlt, fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { faMemo } from '@fortawesome/free-solid-svg-icons';
import './styles.clock.css'

const ClockInPortal = (props) => {
  const navigate = useNavigate();
  const { first_name, handleClockIn, viewTimesheet, setCurrentEmployee } =
    props;

  return (
    < div className="welcome_container">
    <Card >
      <Card.Body>
        <Card.Title>Welcome to work {first_name}</Card.Title>
        <Card.Text> It's time to clock in for your shift! </Card.Text>
        <Button
          className='button btn-text-color icon-white'
          variant='primary'
          onClick={() => handleClockIn()}
        >
          <FontAwesomeIcon
            icon={faSignInAlt}
            size={'xl'}
            className='icon-white'
          />
          Clock In
        </Button>
        <Button className='button' variant='secondary' onClick={viewTimesheet}>
          View Timesheet
        </Button>
        <Button
          className='button'
          variant='warning'
          color='error'
          onClick={() => {
            setCurrentEmployee(null);
            navigate('/');
          }}
        >
          Exit
        </Button>
      </Card.Body>
    </Card>
    </div>
  );
};

export default ClockInPortal;
