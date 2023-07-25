import React, { useState, useEffect } from 'react';
import {
  Routes,
  Route,
  Outlet,
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import Clock from './Clock';
import PinPad from './pinpad/PinPad/PinPad';
import EmployeeList from './admin/EmployeeList/EmployeeList';
import AddEmployee from './admin/AddEmployee/AddEmployee';
import AdminDashboard from './admin/AdminDashboard/AdminDashboard';
import EmployeePortal from './EmployeePortal';
import Timesheet from './Timesheet';
import Validation from './Validation/Validation';
import NumberPad from './pinpad/NumberPad';
import logo from '../Rectangle Logo.png';


// when we refactor App.js, we should clean up imports
import AdminLogIn from './admin/AdminLogIn/AdminLogIn';
import PreviousPayPeriod from './admin/PreviousPayPeriod/PreviousPayPeriod';
import CurrentPayPeriod from './admin/CurrentPayPeriod/CurrentPayPeriod';

const App = () => {
  //------------state for each new employee session

  const [employeePin, setEmployeePin] = useState('');
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [currentShift, setCurrentShift] = useState({});
  const [timesheet, setTimesheet] = useState([]);
  const [validationMessage, setValidationMessage] = useState('');
  const [endTime, setEndTime] = useState(null);
  const [startTime, setStartTime] = useState('');

  //state for clockout
  const [extrasView, setExtrasView] = useState('unset');
  const [tips, setTips] = useState(currentShift.tips);
  const [tours, setTours] = useState(0);
  const [reimbursements, setReimbursements] = useState(0);
  const [DOC, setDOC] = useState(0);
  
  // state for admin logged in
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  function getStart(num){
    let start = parseInt(num);
    let shiftStart = new Date(start);
    let string = shiftStart.toLocaleString();
    setStartTime(string);
  };

  function getEnd(num){
    let end = parseInt(num);
    let shiftEnd = new Date(end);
    let string = shiftEnd.toLocaleString();
    setEndTime(string);
  };

  const nav = useNavigate();

  const adminLogOut = (event) => {
    event.preventDefault();
    //send request to API here - make new card for authentication/remove hardcoded body
    fetch('/api/admin/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'markyencheske@gmail.com',
        password: 'password',
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log('logout data', data)
        nav('/');
      })
      .catch((error) => {
        console.log(error);
        // handle error
      });
    setIsAdminLoggedIn(false);
  };

  return (
    <div className='body'>
      {/* NOTE FOR MARK, CLARE, OR KAT -if currentEmployee is true don't render the admin buttons */}
      <div className='app-display'>
        {/* Render login button only if not on an admin page */}
        {!isAdminLoggedIn && !currentEmployee && (
          <Link to='admin/login'>
            <button className='login-btn'>Admin Log in</button>
          </Link>
        )}
        {/* Render sign out button only if admin is logged in */}
        {isAdminLoggedIn ? (
          <Link to='/'>
            <button className='sign-out-btn' onClick={adminLogOut}>
              Sign Out
            </button>
          </Link>
        ) : null}
        <img src={logo} />
        
        <Clock />
      </div>

      <Routes>
        <Route
          path='/'
          element={
            <PinPad
              setEmployeePin={setEmployeePin}
              setCurrentEmployee={setCurrentEmployee}
              setCurrentShift={setCurrentShift}
              getStart={getStart}
              setTips={setTips}
              setTours={setTours}
              setReimbursements={setReimbursements}
              setDOC={setDOC}
            />
          }
        />

        {/* <Route path="admin" element={isAdminLoggedIn ? <AdminDashboard isAdminLoggedIn={isAdminLoggedIn} /> : <AdminLogIn />} /> */}
        {isAdminLoggedIn ? (
          <Route
            path='admin'
            element={<AdminDashboard isAdminLoggedIn={isAdminLoggedIn} />}
          >
           
          </Route>
        ) : null}
        {/* conditional render statement
                // if the admin is logged in,
                  // check if the route path is /admin, if so, render the dashboard and sign out button
                  // if the route path is NOT /admin (e.g. /), 
               */}
        <Route
          path='admin/login'
          element={
            <AdminLogIn
              isAdminLoggedIn={isAdminLoggedIn}
              setIsAdminLoggedIn={setIsAdminLoggedIn}
            />
          }
        />
        <Route path='currentPayPeriod' element={<CurrentPayPeriod isAdminLoggedIn={isAdminLoggedIn} />} />
        <Route path='/previousPayPeriods' element={<PreviousPayPeriod isAdminLoggedIn={isAdminLoggedIn}/>} />
        <Route path='/list' element={<EmployeeList isAdminLoggedIn={isAdminLoggedIn}/>} />

        <Route
          path='employeeportal'
          element={
            <EmployeePortal
              currentEmployee={currentEmployee}
              setCurrentEmployee={setCurrentEmployee}
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
          element={
            <Timesheet
              timesheet={timesheet}
              currentEmployee={currentEmployee}
            />
          }
        />
        <Route
          path='employeeportal/validation'
          element={
            <Validation
              setCurrentEmployee={setCurrentEmployee}
              validationMessage={validationMessage}
              startTime={startTime}
              endTime={endTime}
            />
          }
        />
        <Route
          path='employeeportal/addtips'
          element={
            <NumberPad
              view={extrasView}
              setExtrasView={setExtrasView}
              number={tips}
              setNumber={setTips}
            />
          }
        />
        <Route
          path='employeeportal/addreimbursements'
          element={
            <NumberPad
              view={extrasView}
              setExtrasView={setExtrasView}
              number={reimbursements}
              setNumber={setReimbursements}
            />
          }
        />
        <Route
          path='employeeportal/addtours'
          element={
            <NumberPad
              view={extrasView}
              setExtrasView={setExtrasView}
              number={tours}
              setNumber={setTours}
            />
          }
        />
        <Route
          path='employeeportal/adddoc'
          element={
            <NumberPad
              view={extrasView}
              setExtrasView={setExtrasView}
              number={DOC}
              setNumber={setDOC}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;