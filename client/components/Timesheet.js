import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';

const Timesheet = (props) => {
  const navigate = useNavigate();
  const { timesheet, currentEmployee } = props;

  const startDate = new Date('2023-04-23T04:00:00');
  const endDate = new Date('2023-05-07T03:59:59');

  const [timesheetData, setTimesheetData] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const filteredData = timesheet.filter(item => {
        const shiftDate = new Date(parseInt(item.start_time)).toDateString();
        return new Date(shiftDate) >= startDate && new Date(shiftDate) <= endDate;
      });
      setTimesheetData(filteredData);
    }, 0);

    return () => clearInterval(interval);
  }, [timesheet, startDate, endDate]);

  let totalHours = 0;
  let totalTips = 0;
  let totalReimbursements = 0;
  let totalTours = 0;
  let totalDOC = 0;
  
  const displayTimesheet = timesheetData.sort((a, b) => a.start_time - b.start_time).map(item => {
    totalTips += item.tips;
    totalReimbursements += item.reimbursements;
    totalTours += item.tours;
    totalDOC += item.doc;

    //let date = item.shift_date.slice(0, 9);
    let start = parseInt(item.start_time);
    let end = parseInt(item.end_time);

    let shiftStart = new Date(start);
    let shiftEnd = new Date(end);

    let shiftDate = shiftStart.toDateString();

    let shiftStartHour = shiftStart.getHours();
    let shiftEndHour = shiftEnd.getHours();

    let shiftStartMinute = shiftStart.getMinutes();
    let shiftEndMinute = shiftEnd.getMinutes();

    let shiftStartTime = `${shiftStartHour}:${shiftStartMinute}`;
    let shiftEndTime = `${shiftEndHour}:${shiftEndMinute}`;
    
    let shiftMinutes = shiftEndMinute - shiftStartMinute;
    let shiftHours = shiftEndHour - shiftStartHour;
    let totalShiftHours = `${shiftHours}:${shiftMinutes}`;

    totalHours += shiftHours;
  

    return <tr key={item.start_time}> 
            <td>{shiftDate}</td>
            <td>{shiftStartTime}</td>
            <td>{shiftEndTime}</td>
            <td>{totalShiftHours}</td>
            <td>{item.tips}</td>
            <td>{item.reimbursements}</td>
            <td>{item.tours}</td>
            <td>{item.doc}</td>
          </tr>
          
  })

  return (
    <div>
      <Button variant="secondary"  onClick={() => navigate('/employeeportal')}>Back</Button>
      <div className='timesheet-grid'>
      <h3>{currentEmployee.first_name}'s Timesheet</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Shift Hours</th>
              <th>Tips</th>
              <th>Reimbursements</th>
              <th>Tours</th>
              <th>DOC</th>
            </tr>
          </thead>
          <tbody>
            {displayTimesheet}
          </tbody>
          <thead>
          <tr>
            <th>Totals:</th>
            <th></th>
            <th></th>
            <th>Hours: {totalHours}</th>
            <th>Tips: {totalTips}</th>
            <th>Reimbursements: {totalReimbursements}</th>
            <th>Tours: {totalTours}</th>
            <th>DOC:{totalDOC}</th>
          </tr>
          </thead>
        </Table>
 
      </div>
    </div>
  )
}

export default Timesheet;