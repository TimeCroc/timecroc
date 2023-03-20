import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//need to add better validation

const AddEmployee = () => {
  const [ pin, setPin ] = useState(0);
  const [ first_name, setFirstName ] = useState('');
  const [last_name, setLastName ] = useState('');
  const [phone, setPhone ] = useState(0);
  const [email, setEmail] = useState('');
  const [hourly_rate, setHourlyRate] = useState(0);
  const [validated, setValidated] = useState(false);

  const body = {
    pin: pin,
    first_name: first_name,
    last_name: last_name,
    phone: phone,
    email: email,
    hourly_rate: hourly_rate
  };

  const handleSubmit2 = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    fetch('/api/employees', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(data => console.log('data:', data))
    .catch(err => console.log('error:', err));

    setValidated(true);
  }

  if(validated){
    return (
      <div>
        <h3> {first_name} added! </h3>
        <Link to='/admin'>Back</Link>
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
              onChange={e => setPin(e.target.value)}
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
              <Form.Control type="text" placeholder="Phone" required onChange={e => setPhone(e.target.value)}/>
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
              <Form.Control type="text" placeholder="Hourly rate"  onChange={e => setHourlyRate(e.target.value)}/>
              <Form.Control.Feedback type="invalid">
                Please provide a rate.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
        <Button type="submit">Add</Button>
      </Form>
      <Link to='/admin'>Back</Link>
    </div>
  )
}

export default AddEmployee;