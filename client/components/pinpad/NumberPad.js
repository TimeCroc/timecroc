import React, { useState } from 'react';
import PinDisplay from './PinDisplay';
import BackButton from './BackButton';
import NumButton from './NumButton';
import SubmitButton from './SubmitButton';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

//need to rewrite with more declarative variable names

const NumberPad = (props) => {
  const navigate = useNavigate();
  const { setExtrasView, view, number, setNumber } = props;
  const displayView = view;
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
    <div className='number-pad'>
      <div>
        <h3>Update your {displayView}:</h3>
        <PinDisplay val={inputPin} />
        <h3>{displayView} you've entered:</h3>
        <PinDisplay val={number} />
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

      <Button
        className='button'
        variant='secondary'
        onClick={() => {
          setExtrasView('tips');
          navigate('/employeeportal/addtips');
        }}
      >
        Add Tips
      </Button>
      <Button
        className='button'
        variant='secondary'
        onClick={() => {
          setExtrasView('tours');
          navigate('/employeeportal/addtours');
        }}
      >
        Add Tours
      </Button>
      <Button
        className='button'
        variant='secondary'
        onClick={() => {
          setExtrasView('reimbursements');
          navigate('/employeeportal/addreimbursements');
        }}
      >
        Add Reimbursements
      </Button>
      <Button
        className='button'
        variant='secondary'
        onClick={() => {
          setExtrasView('DOC');
          navigate('/employeeportal/adddoc');
        }}
      >
        Add DOC
      </Button>
      <Button
        className='button'
        variant='primary'
        onClick={() => navigate('/employeeportal')}
      >
        Back to Clock Out
      </Button>
    </div>
  );
};

export default NumberPad;
