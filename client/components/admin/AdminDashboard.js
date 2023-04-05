import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import EmployeeList from './EmployeeList'
import AddEmployee from './AddEmployee';

const AdminDashboard = ({ isAdminLoggedIn }) => {


  return (
    <div>
      
      <h2>Admin Dashboard</h2>
      <ul>
      {isAdminLoggedIn && (
        <Fragment>
          <li>
            <Link to="add">Add Employee</Link>
          </li>
          <li>
            <Link to="list">Employee List</Link>
          </li>
        </Fragment>
        )}
        <li>
        <Link to='/'> Log Out </Link>
        </li>
      </ul>
    </div>
  )
}

export default AdminDashboard;