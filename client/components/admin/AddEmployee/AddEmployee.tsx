import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './AddEmployee.css';

import cleanPhoneNumber from '../../../utils/index'

//need to add better validation

interface Body {
  pin: number
  first_name: string
  last_name: string
  phone: string | null
  email: string
  hourly_rate: number
}
type AddEmployeeProps ={
  setAddEmployee: (boolean) => void;
}

// function to ensure phone number is in valid format
function cleanPhoneNumber(phone: string): string | null {
    // Step 1: Remove non-numeric characters
    let cleanedNumber = phone.replace(/\D/g, '');
    // Step 2: Check the length
    if (cleanedNumber.length < 10 || cleanedNumber.length > 11) {
      return null; // Invalid length, return null
      // cleanedNumber = null;
    }
    // Step 3: Remove an initial '1' from an 11-digit number
    if (cleanedNumber.length === 11 && cleanedNumber[0] === '1') {
      return cleanedNumber.substring(1);
      // cleanedNumber = cleanedNumber.substring(1);
    }
    // Step 4: Don't accept numbers that start with '0'
    if (cleanedNumber[0] === '0' || cleanedNumber[0] === '1') {
      return null; // Numbers starting with '0' are not accepted, return null
      // cleanedNumber = null;
    }
    // return the cleaned phone number
    return cleanedNumber;
  }

const AddEmployee = (props: AddEmployeeProps) => {
  const [ pin, setPin ] = useState<number>(0);
  const [ first_name, setFirstName ] = useState<string>('');
  const [last_name, setLastName ] = useState<string>('');
  const [phone, setPhone ] = useState<string>('');
  const [cleanedPhone, setCleanedPhone] = useState<string | null>(''); // This is the cleaned phone number
  const [email, setEmail] = useState<string>('');
  const [hourly_rate, setHourlyRate] = useState<number>(0);
  const [validated, setValidated] = useState<boolean>(false);

  const { setAddEmployee } = props;

  const body: Body = {
    pin: pin,
    first_name: first_name,
    last_name: last_name,
    phone: cleanedPhone,
    email: email,
    hourly_rate: hourly_rate
  };

   // Update the cleaned phone state when the input value changes
    const handlePhoneChange = (value: string) => {
    const cleaned = cleanPhoneNumber(value);
    setPhone(value);
    setCleanedPhone(cleaned);
    console.log('cleaned:', cleaned)
  };

  // Update the cleaned phone state when the input value changes
    const handlePhoneChange = (value: string) => {
    const cleaned = cleanPhoneNumber(value);
    setPhone(value);
    setCleanedPhone(cleaned);
    console.log('cleaned:', cleaned)
  };

    // This syntax, replacing the above, prevented an error from occurring in employeeController middleware.  
    const handleSubmit2 = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      event.stopPropagation();
    
      const form = event.currentTarget;
  
      // send a window.alert() if the phone number is invalid
      if (cleanedPhone === null) {
        window.alert('you entered the wrong number, dummy!');
        // console.log('form.checkValidity():', form.checkValidity()) // expect false
        setValidated(false);
        console.log(validated, 'validated');
        // We changed the logic of resetting the value back to '' in order to enhance UX
        // setPhone('');
        // setCleanedPhone('');
        return;
      } else {
        fetch('/api/employees', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(data => console.log('data:', data))
        .catch(err => {
          console.log('error:', err)
          setValidated(false)
        });
  
        setValidated(true);
      }
  }

  if(validated){
    return (
      <div>
        <h3 style={{color: 'green'}}> {first_name} added! </h3>
        <button onClick={()=> setAddEmployee(false)}><Link to='/list'>Back</Link></button>
      </div>
    )
  }

  return (
    <div className='add_employee'>
      <Form noValidate validated={validated} onSubmit={handleSubmit2}>
        <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom00">
            <Form.Label>Pin</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Pin"
              onChange={e => setPin(Number(e.target.value))}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>First name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="First name"
              onChange={e => setFirstName(e.target.value)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Last name"
              onChange={e => setLastName(e.target.value)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationCustom03">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" placeholder="Phone" required onChange={e => handlePhoneChange(e.target.value)} value={phone}/>
              <Form.Control.Feedback type="invalid">
                Please provide a valid phone.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom04">
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" placeholder="Email" required onChange={e => setEmail(e.target.value)}/>
              <Form.Control.Feedback type="invalid">
                Please provide a valid email.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom05">
              <Form.Label>Hourly Rate</Form.Label>
              <Form.Control type="text" placeholder="Hourly rate"  onChange={e => setHourlyRate(Number(e.target.value))}/>
              <Form.Control.Feedback type="invalid">
                Please provide a rate.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
        <Button type="submit">Add</Button>
        <button style={{backgroundColor: 'pink'}} onClick={()=> setAddEmployee(false)}><Link to='/list'>Cancel</Link></button>
      </Form>
    </div>
  )
}

export default AddEmployee;