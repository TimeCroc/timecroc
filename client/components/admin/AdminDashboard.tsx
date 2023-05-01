import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import EmployeeList from './EmployeeList'
import AddEmployee from './AddEmployee';

type Props= {
  isAdminLoggedIn: boolean
}

const AdminDashboard: React.FC<Props> = ({ isAdminLoggedIn }) => {


  return (
    <div>
      
      <h2>Admin Dashboard</h2>
      <ul className='admin-dashboard'>
      {isAdminLoggedIn && (
        <Fragment>
          <li>
            <Link to="currentPayPeriod">Current Pay Period</Link>
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