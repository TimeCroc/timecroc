import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import './styles.clock.css';
import { faClock, faFileLines } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ClockOutPortal = (props) => {
  const navigate = useNavigate();
  const {
    first_name,
    viewTimesheet,
    handleClockOut,
    startTime,
    setExtrasView,
    setCurrentEmployee,
  } = props;

  return (
    <div>
      <Card className='card'>
        <Card.Body className='card-body'>
          <Card.Title className='card-title'>
            Welcome back {first_name}
          </Card.Title>
          <Card.Text>
            {' '}
            You've been clocked in since {startTime}. Are you ready to clock
            out?{' '}
          </Card.Text>
          <div className='btn-container'>
            <Button
              className='button'
              variant='primary'
              onClick={() => handleClockOut()}
            >
              <FontAwesomeIcon
                icon={faClock}
                size={'lg'}
                className='icon-white'
                style={{ marginRight: '10px' }}
              />
              Clock Out
            </Button>
            <Button
              className='button'
              variant='primary'
              onClick={viewTimesheet}
            >
              <FontAwesomeIcon
                icon={faFileLines}
                size={'lg'}
                className='icon-white'
                style={{ marginRight: '10px' }}
              />
              View Timesheet
            </Button>
            <Button
              className='button'
              variant='primary'
              onClick={() => {
                setExtrasView('tips');
                navigate('/employeeportal/addtips');
              }}
            >
              Add Tips/Extras
            </Button>
            <Button
              className='button'
              variant='danger'
              onClick={() => {
                setCurrentEmployee(null);
                navigate('/');
              }}
            >
              Exit
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ClockOutPortal;
