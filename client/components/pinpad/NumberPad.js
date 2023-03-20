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
  const { tips, setTips, extrasBody, setExtrasBody } = props;
    const displayView = props.view;
    const { setExtrasView } = props;
    const [pin, setPin] = useState('');
    const [employee, setEmployee] = useState({});
    const [shift, setShift] = useState({});
    const [view, setView] = useState(false);

    //console.log('extras body from NumberPad', extrasBody);
    // console.log('view', displayView)
    // console.log(extrasBody[displayView]);
  
    const pinView = (bool) => {
      setView(bool);
    };
    
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

     //setExtrasBody(extrasBody.displayView = pin);
        //setTips(pin);
        setPin('');
        //console.log(extrasBody);
      // }
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
          <h3>Add your {displayView}:</h3>
          <PinDisplay val={pin} />
          <h3>{displayView} you've entered:</h3>
          <PinDisplay val={tips} />
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
            setExtrasView('tours');
            navigate('/employeeportal/addtours')
          }}>Add Tours</Button> 
        <Button className='button' variant="secondary" 
          onClick={() => {
            setExtrasView('reimbursements')
            navigate('/employeeportal/addreimbursements')
          }}>Add Reimbursements</Button> 
        <Button className='button' variant="primary" onClick={() => navigate('/employeeportal')}>Back to Clock Out</Button> 

      </div>
    )
}


export default NumberPad;