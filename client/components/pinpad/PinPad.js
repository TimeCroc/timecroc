import React, { useState } from "react";
import NumButton from './NumButton';
import BackButton from './BackButton'
import SubmitButton from './SubmitButton';
import PinDisplay from './PinDisplay';
import { useNavigate } from "react-router-dom";
import PinpadStyles from './styles.pinpad.css'

const PinPad = (props) => {
  const [pin, setPin] = useState('');
  const { setEmployeePin, setCurrentEmployee, getStart, setCurrentShift, setTips, setTours, setReimbursements, setDOC } = props;
  const navigate = useNavigate();
  
  const updatePin = (val) => {
    let inputPin = pin;
    const nums = new Set(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);
    if (val === '<'){
      inputPin = inputPin.slice(0, -1);
      setPin(inputPin);
    }
    if(inputPin.length < 4 && nums.has(val)){
      inputPin += val;
      setPin(inputPin);
    } 
  }

  const submitClicked = (val) =>{
    let inputPin = pin;
    if (val === '>' && inputPin.length === 4) {
    setEmployeePin(pin);
    fetch(`/api/shifts/${pin}`)
      .then(res => res.json())
      .then(data => {
        //not sure why this doesn't throw an error automatically?
        if(data.err) return;
        setCurrentEmployee(data.targetEmployee);
        if(data.shift){
          setCurrentShift(data.shift);
          getStart(data.shift.start_time)
        } 
        else {
          setCurrentShift({hello: 'world'});
        }
        navigate('/employeeportal');
      })
      .catch(err => console.log('error:', err));
      setPin('');
    }
    //resets all the persisting 'extras' on each entry into a new employee portal
    setTips(0);
    setTours(0);
    setReimbursements(0);
    setDOC(0);
  }

  const pinpad = [];
  for(let i = 1; i < 10; i++){
    pinpad.push(<NumButton num={`${i}`} key={`num${i}`}clicked={e => {
      e.preventDefault();
      updatePin(`${i}`)
    }}/>)
  }

  return (
    <div className='pinpad_container'>
        <PinDisplay val={pin} />
      <div className='pinpad'>
        
        {pinpad}
        <BackButton clicked={e => {
          e.preventDefault();
          updatePin('<')
        }}/>
        <NumButton num={0} clicked={e => {
          e.preventDefault();
          updatePin('0')
        }}/>
        <SubmitButton clicked={e => {
          e.preventDefault();
          submitClicked('>'); 
        }} pin={pin}/>
      </div>
    </div>
  )
}

export default PinPad;