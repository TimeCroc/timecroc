import React, { useState } from 'react';
import ClockInPortal from './ClockInPortal';
import ClockOutPortal from './ClockOutPortal';
import { useNavigate } from 'react-router-dom';

const EmployeePortal = (props) => {
  const navigate = useNavigate();
  const { pin, first_name } = props.currentEmployee;
  const {
    currentShift,
    setTimesheet,
    setValidationMessage,
    endTime,
    setEndTime,
    startTime,
    setStartTime,
    getStart,
    getEnd,
    setExtrasView,
    extrasView,
    setTips,
    tips,
    tours,
    setTours,
    reimbursements,
    setReimbursements,
    DOC,
    setDOC,
  } = props;
  const body = {
    shift_id: currentShift._id,
  };

  const extrasBody = {
    shift_id: currentShift._id,
    tips: tips,
    reimbursements: reimbursements,
    tours: tours,
    doc: DOC,
  };

  function handleClockIn() {
    setTips(0);
    setTours(0);
    setReimbursements(0);
    setDOC(0);

    fetch(`/api/shifts/${pin}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        getStart(data.start_time);
        setValidationMessage(`You clocked in at: `);
        setEndTime(data.end_time);
        navigate('/employeeportal/validation');
      })
      .catch((err) => console.log('error:', err));
  }

  function handleClockOut() {
    handleAddExtras();
    fetch(`/api/shifts/${pin}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        getEnd(data.end_time);
        setValidationMessage(`You clocked out at:  `);
        navigate('/employeeportal/validation');
      })
      .catch((err) => console.log('error:', err));
  }

  function handleAddExtras() {
    fetch(`/api/shifts/extras/${pin}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(extrasBody),
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log('extras body data', data);
      })
      .catch((err) => console.log('error:', err));
    setTips(0);
    setTours(0);
    setReimbursements(0);
    setDOC(0);
  }

  function viewTimesheet() {
    fetch(`api/shifts/timesheet/${pin}`)
      .then((res) => res.json())
      .then((data) => {
        setTimesheet(data);
        navigate('/employeeportal/timesheet');
      })
      .catch((err) => console.log('error:', err));
  }

  if (endTime === null) {
    return (
      <div className='clock_out_portal'>
        <ClockOutPortal
          first_name={first_name}
          handleClockOut={handleClockOut}
          viewTimesheet={viewTimesheet}
          startTime={startTime}
          setExtrasView={setExtrasView}
          tips={tips}
          setTips={setTips}
        />
      </div>
    );
  }
  return (
    <div>
      <div className='clock_in_portal'>
        <ClockInPortal
          first_name={first_name}
          handleClockIn={handleClockIn}
          viewTimesheet={viewTimesheet}
        />
      </div>
    </div>
  );
};

export default EmployeePortal;
