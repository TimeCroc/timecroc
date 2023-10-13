import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './UpdateEmployee.css';

interface EmployeeProps {
  list: {
    pin: string
    first_name: string
    last_name: string
    phone: string
    email: string
    hourly_rate: string
  },
}

// function to ensure phone number is in valid format
function cleanPhoneNumber(phone: string): string | null {
  // Step 1: Remove non-numeric characters
  let cleanedNumber = phone.replace(/\D/g, '');

  let isValidPhoneNumber = true;
  // Step 2: Check the length
  if (cleanedNumber.length < 10 || cleanedNumber.length > 11) {
    isValidPhoneNumber = false;
  }
  // Step 3: Remove an initial '1' from an 11-digit number
  if (cleanedNumber.length === 11 && cleanedNumber[0] === '1') {
    cleanedNumber = cleanedNumber.substring(1);
  }
  // Step 4: Check for an 11-digit number where the first digit is not '1'
  if (cleanedNumber.length === 11 && cleanedNumber[0] !== '1') {
    isValidPhoneNumber = false;
  }
  // Step 5: Don't accept numbers that start with '0'
  if (cleanedNumber[0] === '0' || cleanedNumber[0] === '1') {
    isValidPhoneNumber = false;
  }
  // return the cleaned phone number
  return isValidPhoneNumber ? cleanedNumber : null;
}

const UpdateEmployee: React.FC<EmployeeProps> = ({ list }: EmployeeProps) => {
  const { pin, first_name, last_name, phone, email, hourly_rate } = list;

  const [updatedPin, setUpdatedPin] = useState<string>(pin);
  const [firstName, setFirstName] = useState<string>(first_name);
  const [lastName, setLastName] = useState<string>(last_name);
  const [updatedPhone, setPhone] = useState<string>(phone);
  const [updatedCleanedPhone, setCleanedPhone] = useState<string | null>(''); // This is the cleaned phone number
  const [updatedEmail, setUpdatedEmail] = useState<string>(email);
  const [hourlyRate, setHourlyRate] = useState<string>(hourly_rate);
  const [clicked, setClicked] = useState<boolean>(false);
  const [validated, setValidated] = useState<boolean>(false);

  const body = {
    pin: updatedPin,
    first_name: firstName,
    last_name: lastName,
    phone: updatedCleanedPhone,
    email: updatedEmail,
    hourly_rate: hourlyRate
  };

     // Update the cleaned phone state when the input value changes
     const handlePhoneChange = (value: string) => {
      const cleaned = cleanPhoneNumber(value);
      setPhone(value);
      setCleanedPhone(cleaned);
      console.log('cleaned:', cleaned)
    };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;

    // send a window.alert() if the phone number is invalid
    if (updatedCleanedPhone === null) {
      window.alert('Please enter a valid phone number');
      setValidated(false);
      console.log(validated, 'validated');
      return;
    } else {
      fetch(`/api/employees/${pin}`, {
        method: 'PUT',
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
    
    function handleClick(){
      setClicked(true);
    }
    

  if(validated){
    return (
      <div className="admin_validation">
        <h3>{first_name} Updated</h3>
        <Link to="/admin" />
      </div>
    )
  }

  if(!clicked){
    return (
      <div>
        <Button onClick={handleClick}>Update {first_name} </Button> 
      </div>
    )
  }
  else {
    return (
      <div className='update_employee'>
      <h3>Update {first_name}:</h3>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom00">
            <Form.Label>Pin</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder={pin}
              value={updatedPin}
              onChange={e => setUpdatedPin(e.target.value)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>First name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder={first_name}
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder={last_name}
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationCustom03">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" placeholder={phone}  required onChange={e => handlePhoneChange(e.target.value)} value={updatedPhone}/>
              <Form.Control.Feedback type="invalid">
                Please provide a valid phone.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom04">
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" placeholder={email} value={updatedEmail} required onChange={e => setUpdatedEmail(e.target.value)}/>
              <Form.Control.Feedback type="invalid">
                Please provide a valid email.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom05">
              <Form.Label>Hourly Rate</Form.Label>
              <Form.Control type="text" placeholder={hourly_rate} value={hourlyRate} onChange={e => setHourlyRate(e.target.value)}/>
              <Form.Control.Feedback type="invalid">
                Please provide a rate.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
        <Button type="submit">Update</Button>
      </Form>
      <button style={{backgroundColor: 'pink'}} onClick={() => setClicked(false)}><Link to='/list'>Cancel</Link></button>
    </div>
    )
  }
}

export default UpdateEmployee;