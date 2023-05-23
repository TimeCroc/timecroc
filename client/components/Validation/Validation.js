import React, { useEffect } from 'react';
// added imports for useNavigate and Button
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const Validation = (props) => {
  const { validationMessage, startTime, endTime, setCurrentEmployee } = props;
  const navigate = useNavigate();

  // Definition of handleTimeout function that navigates to the home page
  const handleTimeout = () => {
    setCurrentEmployee(null)
    navigate('/');
  };

  // Utilize useEffect to set a timeout for 3 seconds that calls the handleTimeout function
  useEffect(() => {
    const timeout = setTimeout(handleTimeout, 3000);
    return () => clearTimeout(timeout);
  }, [navigate]);

  // display validationMessage and either startTime or endTime, depending on which is defined
  return (
    <div className='validation'>
      <h3>{validationMessage} {startTime || endTime}</h3>
      {/* When the button is clicked, call navigate function and direct back to '/' */}
      <Button 
        className='button' 
        onClick={() => {
          setCurrentEmployee(null)
          navigate('/')
        }
      }>Exit</Button>
    </div>
  );
}

export default Validation;