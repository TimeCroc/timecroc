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
  const { extrasBody, setExtrasBody, setExtrasView, view, number, setNumber } = props;
    const displayView = view;
    //const { setExtrasView } = props;
    const [pin, setPin] = useState('');
   // const [view, setView] = useState(false);
   const [tips, setTips] = useState(0);

    // console.log('extras body from NumberPad', extrasBody);
    // console.log('view', displayView)
    // console.log(extrasBody[displayView]);
  
    const pinView = (bool) => {
      setView(bool);
    };
    
    let inputPin = pin;
    //let inputPin = '';

    const updatePin = (val) => {
      
      const nums = new Set(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);
      if (val === '<'){
        inputPin = inputPin.slice(0, -1);
        setPin(inputPin);
      }
      if(inputPin.length < 4 && nums.has(val)){
        inputPin += val;
        setPin(inputPin);
      } 
      //console.log('pin in updatePin', pin)
      //console.log('inputPin in updatePin', inputPin)
    }
  
    const submitClicked = (val) =>{
      // let inputPin = pin;
      // if (val === '>' && inputPin.length === 4) {
      
      // fetch(`/api/shifts/${pin}`)
      //   .then(res => res.json())
      //   .then(data => {
      //     //not sure why this doesn't throw an error automatically?
      //     if(data.err) return;
  
      //      setEmployee(data.targetEmployee);
      //      if(data.shift){
      //       setShift(data.shift);
      //      } 
      //      else {
      //       setShift({hello: 'world'});
      //      }
      //      pinView(true);
      //   })
      //   .catch(err => console.log('error:', err));


      //Here is where to assign the tips to the extrasBody in EmployeePortal

     //setExtrasBody(extrasBody[view] = inputPin);
        //setTips(pin);
        setPin(inputPin);
        //console.log('extrasBody in submitClicked', extrasBody);
        //console.log(pin, 'pin in submitClicked')
      // }

      setNumber(inputPin)
      //setPin('');
      resetPin();
      //console.log(pin, 'pin in submitClicked 2')
      inputPin = 0;
    }

    const resetPin = () => {
      setPin('');
    }
  
    const pinpad = [];
    for(let i = 1; i < 10; i++){
      pinpad.push(<NumButton num={`${i}`} key={`num${i}`}clicked={e => {
        e.preventDefault();
        updatePin(`${i}`)
      }}/>)
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

        <Button className='button' variant="secondary" 
          onClick={() => {
            setExtrasView('tips');
            navigate('/employeeportal/addtips')
          }}>Add Tips</Button> 
        <Button className='button' variant="secondary" 
          onClick={() => {
            setExtrasView('tours');
            navigate('/employeeportal/addtours')
          }}>Add Tours</Button> 
        <Button className='button' variant="secondary" 
          onClick={() => {
            setExtrasView('reimbursements')
            navigate('/employeeportal/addreimbursements')
          }}>Add Reimbursements</Button> 
        <Button className='button' variant="secondary" 
          onClick={() => {
            setExtrasView('DOC')
            navigate('/employeeportal/adddoc')
          }}>Add DOC</Button> 
        <Button className='button' variant="primary" onClick={() => navigate('/employeeportal')}>Back to Clock Out</Button> 

      </div>
    )
}


export default NumberPad;