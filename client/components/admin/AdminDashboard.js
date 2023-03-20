import React from 'react';
import { Link } from 'react-router-dom';
import EmployeeList from './EmployeeList'
import AddEmployee from './AddEmployee';

const AdminDashboard = () => {


  return (
    <div>
      <h2>Admin Dashboard</h2>
      <ul>
        <li>
          <Link to="add">Add Employee</Link>
        </li>
        <li>
          <Link to="list">Employee List</Link>
        </li>
        <li>
        <Link to='/'> Log Out </Link>
        </li>
      </ul>
    </div>
  )
}

export default AdminDashboard;