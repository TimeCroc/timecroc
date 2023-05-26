import React, { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// These next two imports appear to not be needed.  Commenting them out to see if anything breaks.
// import EmployeeList from '../EmployeeList'
// import AddEmployee from '../AddEmployee/AddEmployee';
import './AdminDashboard.css';

type Props= {
  isAdminLoggedIn: boolean,
  payPeriod: [],
  setPayPeriod: (payPeriod: []) => void,
}

const AdminDashboard: React.FC<Props> = ({ isAdminLoggedIn, payPeriod, setPayPeriod }) => {
  const navigate = useNavigate();

  // How are we getting the data from the database?
  function viewCurrentPayPeriodData() {
    fetch(`api/shifts/currentpayperiod`)
      .then((res) => res.json())
      .then((data) => {
         setPayPeriod(data);
         navigate('/admin/currentpayperiod');
      })
      .catch((err) => console.log('error:', err));
  }

  return (
    <div>
      
      <h2>Admin Dashboard</h2>
      <ul className='admin-dashboard'>
      {isAdminLoggedIn && (
        <Fragment>
          <li>
            <Link to="currentpayperiod" onClick={viewCurrentPayPeriodData}>Current Pay Period</Link>
          </li>
          <li>
            <Link to="previousPayPeriods">Previous Pay Periods</Link>
          </li>
          <li>
            <Link to="add">Add Employee</Link>
          </li>
          <li>
            <Link to="list">Employee List</Link>
          </li>
        </Fragment>
        )}
      </ul>
    </div>
  )
}

export default AdminDashboard;