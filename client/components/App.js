import React, { useState, useEffect } from 'react';
import { Routes, Route, Outlet, Link, useLocation } from 'react-router-dom';
import Clock from './Clock';
import PinPad from './pinpad/PinPad';
import EmployeeList from './admin/EmployeeList';
import AddEmployee from './admin/AddEmployee';
import AdminDashboard from './admin/AdminDashboard';
import EmployeePortal from './EmployeePortal';
import Timesheet from './Timesheet';
import Validation from './Validation';
import NumberPad from './pinpad/NumberPad';
import logo from '../Rectangle Logo.png';

// when we refactor App.js, we should clean up imports
import AdminLogIn from './admin/AdminLogIn';

const App = () => {
  //------------state for each new employee session

  const [employeePin, setEmployeePin] = useState('');
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [currentShift, setCurrentShift] = useState({});
  const [timesheet, setTimesheet] = useState([]);
  const [validationMessage, setValidationMessage] = useState('');
  const [endTime, setEndTime] = useState(null);
  const [startTime, setStartTime] = useState('vanilla');

  //state for clockout
  const [extrasView, setExtrasView] = useState('unset');
  const [tips, setTips] = useState(currentShift.tips);
  const [tours, setTours] = useState(0);
  const [reimbursements, setReimbursements] = useState(0);
  const [DOC, setDOC] = useState(0);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  function getStart(num) {
    let start = parseInt(num);
    let shiftStart = new Date(start);
    let string = shiftStart.toLocaleString();
    setStartTime(string);
  }

  function getEnd(num) {
    let end = parseInt(num);
    let shiftEnd = new Date(end);
    let string = shiftEnd.toLocaleString();
    setEndTime(string);
  }

  // useLocation hook to get the current pathname
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className='body'>
      <div className='app-display'>
        {/* Render sign out button only if admin is logged in */}
        {isAdminLoggedIn && (
          <Link to='admin/logout'>
            <button className='login-btn'>Log Out</button>
          </Link>
        )}

        {!isAdminLoggedIn && location.pathname === '/' && (
          <Link to='admin/login'>
            <button className='login-btn'>Admin Log in</button>
          </Link>
        )}

        <img src={logo} />
        <Clock />
      </div>

      {/* Render login button only if not on an admin page and not logged in as admin */}
      {!isAdminPage && !isAdminLoggedIn && currentEmployee === null && (
        <Link to='admin/login'>
          <button className='login-btn'>Admin Log in</button>
        </Link>
      )}
      <Routes>
        <Route
          path='/'
          element={
            <PinPad
              setEmployeePin={setEmployeePin}
              setCurrentEmployee={setCurrentEmployee}
              setCurrentShift={setCurrentShift}
              setTips={setTips}
              setTours={setTours}
              setReimbursements={setReimbursements}
              setDOC={setDOC}
            />
          }
        />
        {isAdminLoggedIn ? (
          <Route
            path='admin'
            element={<AdminDashboard isAdminLoggedIn={isAdminLoggedIn} />}
          />
        ) : null}
        <Route
          path='admin/login'
          element={
            <AdminLogIn
              isAdminLoggedIn={isAdminLoggedIn}
              setIsAdminLoggedIn={setIsAdminLoggedIn}
            />
          }
        />
        <Route path='admin/currentPayPeriod' element={<AddEmployee />} />
        <Route path='admin/previousPayPeriods' element={<EmployeeList />} />
        <Route path='admin/add' element={<AddEmployee />} />
        <Route path='admin/list' element={<EmployeeList />} />

        <Route
          path='employeeportal'
          element={
            <EmployeePortal
              currentEmployee={currentEmployee}
              currentShift={currentShift}
              employeePin={employeePin}
              endTime={currentShift.end_time}
              startTime={startTime}
              setTimesheet={setTimesheet}
              setValidationMessage={setValidationMessage}
              setEndTime={setEndTime}
              setStartTime={setStartTime}
              getStart={getStart}
              getEnd={getEnd}
              extrasView={extrasView} //needed?
              setExtrasView={setExtrasView} //needed?
              tips={tips}
              setTips={setTips}
              tours={tours}
              setTours={setTours}
              reimbursements={reimbursements}
              setReimbursements={setReimbursements}
              DOC={DOC}
              setDOC={setDOC}
            />
          }
        />
        <Route
          path='employeeportal/timesheet'
          element={<Timesheet timesheet={timesheet} />}
        />
        <Route
          path='employeeportal/validation'
          element={
            <Validation
              validationMessage={validationMessage}
              startTime={startTime}
              endTime={endTime}
            />
          }
        />
        <Route
          path='employeeportal/addtips'
          element={
            <NumberPad value={tips} setValue={setTips} buttonText='Add Tip' />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
