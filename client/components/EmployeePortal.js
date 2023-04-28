import React, { useState } from 'react';
import ClockInPortal from './ClockInPortal';
import ClockOutPortal from './ClockOutPortal';
import { useNavigate } from 'react-router-dom';

const EmployeePortal = (props) => {
  const navigate = useNavigate();
  const { pin, first_name } = props.currentEmployee;
  const { currentShift, setTimesheet, setValidationMessage, endTime, setEndTime, startTime, setStartTime, getStart, getEnd, setExtrasView, extrasView, setTips, tips, tours, setTours, reimbursements, setReimbursements, DOC, setDOC } = props;
  const body = {
    shift_id: currentShift._id,
  };
  
  const extrasBody = {
    shift_id: currentShift._id,
    tips: tips,
    reimbursements: reimbursements,
    tours: tours,
    doc: DOC
  };


  function handleClockIn () {
    setTips(0);
    setTours(0);
    setReimbursements(0);
    setDOC(0);

    fetch(`/api/shifts/${pin}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(data => {
      getStart(data.start_time);
      setValidationMessage(`Clocked in: `)
      setEndTime(data.end_time);
      navigate('/employeeportal/validation');
    })
    .catch(err => console.log('error:', err));
  }

  function handleClockOut () {
    handleAddExtras();
    fetch(`/api/shifts/${pin}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(data => {
      getEnd(data.end_time);
      setValidationMessage(`Clocked out:  `)
      navigate('/employeeportal/validation');
    })
    .catch(err => console.log('error:', err));
  }

  function handleAddExtras () {
    fetch(`/api/shifts/extras/${pin}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(extrasBody)
    })
    .then(res => res.json())
    .then(data => {
      //console.log('extras body data', data);
    })
    .catch(err => console.log('error:', err));
    setTips(0);
    setTours(0);
    setReimbursements(0);
    setDOC(0);
  }

  function viewTimesheet (){
    fetch(`api/shifts/timesheet/${pin}`)
    .then(res => res.json())
    .then(data => {
      setTimesheet(data);
      navigate('/employeeportal/timesheet');
      })
    .catch(err => console.log('error:', err))
  }

  if(endTime === null){
    return (
      <div className="clock_out_portal">
        <h3>Clock out portal goes here</h3>
        <ClockOutPortal first_name={first_name} handleClockOut={handleClockOut} viewTimesheet={viewTimesheet} startTime={startTime} setExtrasView={setExtrasView} tips={tips} setTips={setTips}/>
      </div>
    )
  }
  return(
    <div>
      <h3>Welcome to work {first_name}</h3>
      <div className="clock_in_portal">
        <ClockInPortal first_name={first_name} handleClockIn={handleClockIn} viewTimesheet={viewTimesheet}/>
      </div>
    </div>
  )
}

export default EmployeePortal;





















  // if(isClockedIn){
  //   return(
  //     <div>
        
  //       <h4>You clocked in at {shiftStartTime} on {shiftStartDate}</h4>
  //       <button onClick={() => changePinView(false)}>Back</button>
  //     </div>
  //   )
  // }

  // if(isClockedOut){
  //  handleClockOut();
  //   return(
  //     <div>
  //       <h4>You clocked out at {shiftEndTime}</h4>
  //       <button onClick={() => pinView(false)}>Back</button>
  //     </div>
  //   )
  // }

  // if(timesheetView){
  //   return (
  //     <div>
  //       <Timesheet changeTimesheetView={changeTimesheetView} timesheet={timesheet}/>
  //     </div>
  //   )
  // }

  // if(clicked){
  //   return (
  //     <div>
  //       <h4>Don't forget to add your tips!</h4>
  //       <button onClick={handleClockOut}>Clock out</button>
  //       <button onClick={() => updateClicked(false)}>Back</button>
  //     </div>
  //   )
  // }

  // if(extrasView){
  //   return (
  //     <div>
  //       <form>
  //         <label htmlFor='tips'>Tips</label>
  //           <input id='tips' type='text' value={tips} onChange={e => setTips(e.target.value)}></input>
  //         <label htmlFor='reimbursements'>Reimbursements</label>
  //           <input id='reimbursements' type='text' value={reimbursements} onChange={e => setReimbursements(e.target.value)}></input>
  //         <label htmlFor='tours'>Tours</label>
  //           <input id='tours' type='text' value={tours} onChange={e => setTours(e.target.value)}></input>
  //         <label htmlFor='doc'>DOC</label>  
  //           <input id='doc' type='text' value={doc} onChange={e => setDoc(e.target.value)}></input> 
  //       </form>
  //       <button onClick={handleAddExtras}>Add</button>
  //       <button onClick={() => setExtrasView(false)}>Back</button>
  //     </div>
  //   )
  // }

  // // if end_time is null on the most recent shift returned from database, the employee is currently clocked in
  // if(end_time === null){
  //   return (
  //     <div className="clock_out_portal">
  //       <ClockOutPortal first_name={first_name} setExtrasView={setExtrasView} updateClicked={updateClicked} string={string} viewTimesheet={viewTimesheet} changePinView={changePinView}/>
  //     </div>
  //   )
  // }
  // // if employee end_time is not null, the most recent shift returned from database already ended. Now it's time to start a new shift
  // return (
  //   <div className="clock_in_portal">
  //     <ClockInPortal first_name={first_name} handleClockIn={handleClockIn} viewTimesheet={viewTimesheet} changePinView={changePinView}/>
  //   </div>
  // )