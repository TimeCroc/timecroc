import React, { useState, useEffect } from 'react';
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Clock from './Clock';
import PinPad from './pinpad/PinPad';
import EmployeeList from './admin/EmployeeList';
import AddEmployee from './admin/AddEmployee';
import AdminDashboard from './admin/AdminDashboard';
import EmployeePortal from './EmployeePortal';
import Timesheet from './Timesheet';
import Validation from './Validation';
import NumberPad from './pinpad/NumberPad';
const App = () => {
  //------------state for each new employee session

  const [employeePin, setEmployeePin] = useState('');
  const [currentEmployee, setCurrentEmployee] = useState({});
  const [currentShift, setCurrentShift] = useState({});
  const [timesheet, setTimesheet] = useState([]);
  const [validationMessage, setValidationMessage] = useState('');
  const [endTime, setEndTime] = useState(null);
  const [startTime, setStartTime] = useState('vanilla');
  const [extrasView, setExtrasView] = useState('unset');
  const [tips, setTips] = useState(0);
  const [extrasBody, setExtrasBody] = useState({tips: 0, tours: 0, reimbursements: 0, DOC: 0})


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

    return (
      <div className='body'>
        <div>
          <Link to="admin">Admin Log in</Link>
          <h1>TimeCroc</h1>
          <Clock />
        </div>
        <Routes>
          <Route path="/" 
            element={<PinPad 
            setEmployeePin={setEmployeePin} 
            setCurrentEmployee={setCurrentEmployee}
            setCurrentShift={setCurrentShift}
            />} 
          />
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/add" element={<AddEmployee />} />
          <Route path="admin/list" element={<EmployeeList />} />
          <Route path="employeeportal" 
            element={<EmployeePortal 
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
              extrasView={extrasView}
              setExtrasView={setExtrasView}
              tips={tips}
              setTips={setTips}
            />} 
          />
          <Route path="employeeportal/timesheet" element={<Timesheet timesheet={timesheet}/>}/>  
          <Route path="employeeportal/validation" 
            element={<Validation 
              validationMessage={validationMessage} 
              startTime={startTime} 
              endTime={endTime}
            />}
          />
          <Route path="employeeportal/addtips" 
            element={<NumberPad 
              view={extrasView}
              setExtrasView={setExtrasView}
              extrasBody={extrasBody}
              setExtrasBody={setExtrasBody}
              tips={tips}
              setTips={setTips}
            />}
          />
          <Route path="employeeportal/addreimbursements" 
            element={<NumberPad 
              view={extrasView}
              setExtrasView={setExtrasView}
              extrasBody={extrasBody}
              setExtrasBody={setExtrasBody}
            />}
          />
          <Route path="employeeportal/addtours" 
            element={<NumberPad 
              view={extrasView}
              setExtrasView={setExtrasView}
              extrasBody={extrasBody}
              setExtrasBody={setExtrasBody}
            />}
          />
        </Routes>  
      </div>
    );
}

export default App;