import React, { useState } from 'react';
import PinDisplay from './PinDisplay';
import PinDisplay2 from './PinDisplay2';
import BackButton from './BackButton';
import NumButton from './NumButton';
import SubmitButton from './SubmitButton';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRightFromBracket,
  faClock,
  faFileLines,
  faRotateLeft,
  faHandHoldingDollar,
  faStreetView,
  faMoneyCheckDollar,
  faFilePdf,
} from '@fortawesome/free-solid-svg-icons';
import './styles.pinpad.css';

//need to rewrite with more declarative variable names
const NumberPad = (props) => {
  const navigate = useNavigate();
  const { setExtrasView, view, number, setNumber } = props;
  const displayView = view.charAt(0).toUpperCase() + view.slice(1);
  const [pin, setPin] = useState('');
  let inputPin = pin;

  const updatePin = (val) => {
    const nums = new Set(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);
    if (val === '<') {
      inputPin = inputPin.slice(0, -1);
      setPin(inputPin);
    }
    if (inputPin.length < 4 && nums.has(val)) {
      inputPin += val;
      setPin(inputPin);
    }
  };

  const submitClicked = (val) => {
    setPin(inputPin);
    setNumber(inputPin);
    resetPin();
  };

  const resetPin = () => {
    setPin('');
  };

  const pinpad = [];
  for (let i = 1; i < 10; i++) {
    pinpad.push(
      <NumButton
        num={`${i}`}
        key={`num${i}`}
        clicked={(e) => {
          e.preventDefault();
          updatePin(`${i}`);
        }}
      />
    );
  }

  return (
    <div className='pinpad_container2'>
      <div className='pinpad_info'>
        <div>Update {displayView}:</div>
        <div className='pinpad_info'>
          <PinDisplay2 val={inputPin} className='pin-display2' />
        </div>
        <div className='pinpad_info'>
          <div>{displayView} Entered:</div>
          <PinDisplay2 val={number} className='pin-display2' />
        </div>
      </div>

      <div className='pinpad'>
        {pinpad}
        <BackButton
          clicked={(e) => {
            e.preventDefault();
            updatePin('<');
          }}
        />
        <NumButton
          num={0}
          clicked={(e) => {
            e.preventDefault();
            updatePin('0');
          }}
        />
        <SubmitButton
          clicked={(e) => {
            e.preventDefault();
            submitClicked('>');
          }}
          pin={pin}
        />
      </div>

      <div className='btn-config'>
        <Button
          className='button'
          variant='primary'
          onClick={() => {
            setExtrasView('tips');
            navigate('/employeeportal/addtips');
          }}
        >
          <FontAwesomeIcon
            icon={faHandHoldingDollar}
            size={'lg'}
            className='icon-white'
            style={{ marginRight: '10px' }}
          />
          Add Tips
        </Button>
        <Button
          className='button'
          variant='primary'
          onClick={() => {
            setExtrasView('tours');
            navigate('/employeeportal/addtours');
          }}
        >
          <FontAwesomeIcon
            icon={faStreetView}
            size={'lg'}
            className='icon-white'
            style={{ marginRight: '10px' }}
          />
          Add Tours
        </Button>
        <div className="reimbursements">
        <Button
          className='button'
          variant='primary'
          onClick={() => {
            setExtrasView('reimbursements');
            navigate('/employeeportal/addreimbursements');
          }}
        >
          <FontAwesomeIcon
            icon={faMoneyCheckDollar}
            className='icon-white'
            size={'lg'}
            style={{ marginRight: '10px' }}
          />
          Add Reimbursements
        </Button>
        </div>
        <Button
          className='button'
          variant='primary'
          onClick={() => {
            setExtrasView('DOC');
            navigate('/employeeportal/adddoc');
          }}
        >
          <FontAwesomeIcon
            icon={faFilePdf}
            className='icon-white'
            size={'lg'}
            style={{ marginRight: '10px' }}
          />
          Add DOC
        </Button>
        <Button
          className='button'
          variant='success'
          onClick={() => navigate('/employeeportal')}
        >
          <FontAwesomeIcon
            icon={faRotateLeft}
            size={'lg'}
            style={{ marginRight: '10px' }}
          />
          Back to Clock Out
        </Button>
      </div>
    </div>
  );
};

export default NumberPad;
