import React, { useState, useEffect, useContext } from 'react';
import PayPeriodContext from '../context/PayPeriodContext';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';

const Timesheet = (props) => {
  const navigate = useNavigate();
  const { timesheet, currentEmployee } = props;

  const { currentPayPeriodStart, currentPayPeriodEnd, formattedCurrentPayPeriod } = useContext(PayPeriodContext);
  
  let totalHours = 0;
  let totalMinutes = 0;
  let totalTips = 0;
  let totalReimbursements = 0;
  let totalTours = 0;
  let totalDOC = 0;
  
  const displayTimesheet = timesheet
  .filter(item => {
    const shiftStart = new Date(parseInt(item.start_time));
    const shiftEnd = new Date(parseInt(item.end_time));
    return shiftStart >= currentPayPeriodStart && shiftEnd <= currentPayPeriodEnd;
  })
    .sort((a, b) => a.start_time - b.start_time)
    .map(item => {
    totalTips += item.tips;
    totalReimbursements += item.reimbursements;
    totalTours += item.tours;
    totalDOC += item.doc;

    let start = parseInt(item.start_time);
    let end = parseInt(item.end_time);

    let shiftStart = new Date(start);
    let shiftEnd = new Date(end);

    let shiftDate = shiftStart.toDateString();

    let shiftStartHour = shiftStart.getHours();
    let shiftEndHour = shiftEnd.getHours();

    let shiftStartMinute = shiftStart.getMinutes();
    let shiftEndMinute = shiftEnd.getMinutes();

    // Round up or down seconds to the nearest minute
    let shiftMinutes = Math.round((shiftEndMinute - shiftStartMinute + (shiftEnd.getSeconds() - shiftStart.getSeconds()) / 60));

    // logic for handling the seconds 
    let shiftSeconds = shiftEnd.getSeconds() - shiftStart.getSeconds();
    if (shiftSeconds < 0) {
      shiftSeconds += 60;
      shiftEndMinute--;
    }

    // logic for properly handling minutes to avoid the negative values
    if (shiftMinutes < 0) {
      shiftMinutes += 60;
      shiftEndHour--;
    }

    // logic for properly handling hours to avoid the negative values
    let shiftHours = shiftEndHour - shiftStartHour;
    if (shiftHours < 0) {
      shiftHours += 24;
    }

    // add leading zero to shiftMinutes if it is less than 10
    let totalShiftHours = `${shiftHours}:${shiftMinutes < 10 ? '0' : ''}${shiftMinutes}`;

    totalHours += shiftHours;
    totalMinutes += shiftMinutes;

    return <tr key={item.start_time}> 
            <td>{shiftDate}</td>
            {/* ensuring proper formatting of times */}
            <td>{shiftStart.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td>
            <td>{shiftEnd.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td>
            <td>{totalShiftHours.toLowerCase([], {hour: '2-digit', minute:'2-digit'})}</td>
            <td>{item.tips}</td>
            <td>{item.reimbursements}</td>
            <td>{item.tours}</td>
            <td>{item.doc}</td>
          </tr>
  })

  totalHours += Math.floor(totalMinutes / 60);
  totalMinutes = totalMinutes % 60;

  // call function to handle sending the totals to the database
  // const handleTotals = () => {
  //   const { _id } = currentEmployee;
  //   const { tips, reimbursements, tours, doc } = totals;
  //   const input = [_id, tips, reimbursements, tours, doc];
  //   fetch(`/api/shift/extras/${_id}`, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(input)
  //   })
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log('Success:', data);
  //   })
  //   .catch((error) => {
  //     console.error('Error:', error);
  //   });
  // }


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
          <tbody>{displayTimesheet}</tbody>
          <thead>
            <tr>
              <th>Totals:</th>
              <th></th>
              <th></th>
              <th>{`${totalHours}:${(totalHours * 60 + totalMinutes) % 60 < 10 ? '0' : ''}${(totalHours * 60 + totalMinutes) % 60}`}</th>
              <th>{totalTips}</th>
              <th>{totalReimbursements}</th>
              <th>{totalTours}</th>
              <th>{totalDOC}</th>
            </tr>
          </thead>
        </Table>
      </div>
    </div>
  );
};

export default Timesheet;
