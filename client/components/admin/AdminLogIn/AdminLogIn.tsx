import React, { useState } from 'react';

import { useNavigate, Link } from 'react-router-dom';
import './AdminLogIn.css';
// .png is commented out right now to avoid errors
// import TimeCroc from '../../TimeCroc.png';
// import { PNG } from 'pngjs';

type Props = {
  isAdminLoggedIn: boolean
  setIsAdminLoggedIn: (value: boolean) => void
}

const AdminLogIn: React.FC<Props> = ({ isAdminLoggedIn, setIsAdminLoggedIn }) => {
	const [email, setEmail] = useState<string>('');
  const [admin_password, setPassword] = useState<string>('');
	
	const nav = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch('/api/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        admin_password
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.authenticated) { // check if the login was successful
        setIsAdminLoggedIn(true);
        nav('/admin')
      } else {
        // display an error message to the user
        alert('Incorrect email or password');
      }
    })
    .catch(error => {
      console.log(error);
      // handle error
    });
  };

	return (
    <>
    <div> 
      <hr  style={{
    color: '#000000',
    backgroundColor: '#000000',
    height: .5,
    borderColor : '#000000'
}}/>
  </div>
  {/* below is the styles for the .png (which is commented out) */}
  {/* <div className='form-container' style={{backgroundImage: `url(${TimeCroc})`}}> */}
    
    <div className='form-container'>
      <div className='form'>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <h2>Administrator Log In</h2>
            <label>
              Email:
            <input className='form-control' type='text' value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)} required />
            </label>
            <label>
              Password:
            <input className='form-control' type='password' value={admin_password} placeholder='Password' onChange={(e) => setPassword(e.target.value)} required/>
            </label>
          </div>
          <div>
            <button className='button-style' type='submit'><Link to='/'>Cancel</Link></button>
            <button className='button-style' type='submit'>Log in</button>
          </div>
        </form>
      </div>
		</div>
    </>
	)
}

export default AdminLogIn;