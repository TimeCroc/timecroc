import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  isAdminLoggedIn: boolean
  setIsAdminLoggedIn: (value: boolean) => void
}

const AdminLogIn: React.FC<Props> = ({ isAdminLoggedIn, setIsAdminLoggedIn }) => {
	const [email, setEmail] = useState('');
  const [admin_password, setPassword] = useState('');
	
	const nav = useNavigate();

  const handleSubmit = (event) => {
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
      // do something with the response data
      console.log(data);
      // set setIsAdminLoggedIn to true
      setIsAdminLoggedIn(true);
			nav('/admin')
    })
    .catch(error => {
      console.log(error);
      // handle error
    });
  };
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div>
					<label>
						Email:
					<input type='text' value={email} placeholder='email' onChange={(e) => setEmail(e.target.value)} required />
					</label>
					<label>
						Password:
					<input type='password' value={admin_password} placeholder='password' onChange={(e) => setPassword(e.target.value)} required/>
					</label>
				</div>
			<div>
				<button type='submit'>Log in</button>
				</div>
			</form>
		</div>
	)
}

// form with two inputs are email and password
// button to submit

export default AdminLogIn;

