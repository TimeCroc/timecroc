import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

type Props= {
  isAdminLoggedIn: boolean
}

const AdminDashboard: React.FC<Props> = ({ isAdminLoggedIn }) => {

  return (
    <div>   
      <h2>Admin Dashboard</h2>
      {isAdminLoggedIn && (
      <nav className='admin-dashboard'>
        <button><Link to="/currentPayPeriod">Current Pay Period</Link></button>
        <button><Link to="/previousPayPeriods">Previous Pay Periods</Link></button>
        <button><Link to="/list">Employee List</Link></button>
      </nav>
      )}
    </div>
  )
}

export default AdminDashboard;