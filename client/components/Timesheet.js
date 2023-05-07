import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';

const Timesheet = (props) => {
  const navigate = useNavigate();
  const { timesheet, currentEmployee } = props;

  const appStartDate = new Date('2022-12-04T04:00:00');
  const appEndDate = new Date('2092-12-04T03:59:59');

  function twoWeekLoop(startDate, endDate) {
    const dateArray = [];
    const payPeriodDuration = 1209600000; // 2 weeks in milliseconds
    let interval = payPeriodDuration;
    let intervalTime = Date.parse(startDate);
  
    while (intervalTime <= Date.parse(endDate)) {
      const startDate = new Date(intervalTime);
      const endDate = new Date(intervalTime + payPeriodDuration);
      const displayStartDate = startDate.toDateString();
      const displayEndDate = endDate.toDateString();
  
      dateArray.push({ startDate, endDate, displayStartDate, displayEndDate });
  
      intervalTime += interval;
    }
  
    // Filter out pay periods that are entirely before the current pay period
    const recentPayPeriods = dateArray.filter((payPeriod) => payPeriod.endDate > Date.now());
  
    // Find the most recent pay period that is entirely after the current pay period
    const mostRecentPayPeriod = recentPayPeriods.find((payPeriod) => payPeriod.startDate > Date.now());
    return mostRecentPayPeriod;
  }

  function getCurrentPayPeriod(mostRecentPayPeriod) {
    const startOfPayPeriod = new Date(mostRecentPayPeriod.startDate.getTime() - 1209600000);
    const endOfPayPeriod = new Date(mostRecentPayPeriod.startDate.getTime() - 1);
    return [startOfPayPeriod, endOfPayPeriod];
  }

  const mostRecentPayPeriod = twoWeekLoop(appStartDate, appEndDate);
  const [currentPayPeriodStart, currentPayPeriodEnd] = getCurrentPayPeriod(mostRecentPayPeriod);
  console.log([currentPayPeriodStart, currentPayPeriodEnd])
  const previousPayPeriodEnd = new Date(mostRecentPayPeriod.startDate.getTime() - 1);
  const previousPayPeriodStart = new Date(previousPayPeriodEnd.getTime() - 1209600000);
  const previousPayPeriod = twoWeekLoop(previousPayPeriodStart, previousPayPeriodEnd);


  let totalHours = 0;
  // added value for totalMinutes
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

// CODE GRAVEYARD
  // const [timesheetData, setTimesheetData] = useState([]);

  // const now = new Date();
  // console.log("now", now)
  // const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
  // const currentStartDate = new Date(now);
  // currentStartDate.setHours(4, 0, 0, 0); // set to Sunday at 4:00 a.m.
  // if (currentDay !== 0) {
  //   currentStartDate.setDate(currentStartDate.getDate() - (currentDay + 6) % 14 - 1); // set to the previous Sunday
  // }
  // console.log("currentStartDate", currentStartDate)
  // const currentEndDate = new Date(currentStartDate);
  // currentEndDate.setDate(currentEndDate.getDate() + 14); // add two weeks
  // currentEndDate.setHours(3, 59, 59, 999); // set to Sunday at 3:59 a.m.
  // console.log("currentEndDate", currentEndDate)

  // const nextStartDate = new Date(currentEndDate);
  // nextStartDate.setMilliseconds(nextStartDate.getMilliseconds() + 1); // start the next pay period immediately after the current one ends
  // console.log("nextStartDate", nextStartDate)
  // const nextEndDate = new Date(nextStartDate);
  // nextEndDate.setDate(nextEndDate.getDate() + 14); // add two weeks
  // nextEndDate.setHours(3, 59, 59, 999);
  // console.log("nextEndDate", nextEndDate)

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const filteredData = timesheet.filter(item => {
  //       const shiftDate = new Date(parseInt(item.start_time)).toDateString();
  //       return new Date(shiftDate) >= currentStartDate && new Date(shiftDate) <= currentEndDate;
  //     });
  //     setTimesheetData(filteredData);
  //   }, 0);

  //   return () => clearInterval(interval);
  // }, [timesheet, currentStartDate, currentEndDate]);
