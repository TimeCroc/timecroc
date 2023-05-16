import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import {
  faArrowRightFromBracket,
  faClock,
  faFileLines,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './styles.clock.css';

const ClockInPortal = (props) => {
  const navigate = useNavigate();
  const { first_name, handleClockIn, viewTimesheet, setCurrentEmployee } =
    props;

  return (
    <div>
      <Card className='card'>
        <Card.Body className='card-body'>
          <Card.Title>Welcome to work {first_name}! </Card.Title>
          <Card.Text> It's time to clock in for your shift. </Card.Text>
          <div className='btn-container'>
            <Button
              className='button'
              variant='primary'
              onClick={() => handleClockIn()}
            >
              <FontAwesomeIcon
                icon={faClock}
                size={'lg'}
                className='icon-white'
                style={{ marginRight: '10px' }}
              />
              Clock In
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
              variant='warning'
              onClick={() => {
                setCurrentEmployee(null);
                navigate('/');
              }}
            >
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                size={'lg'}
                style={{ marginRight: '10px' }}
              />
              Exit
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ClockInPortal;
