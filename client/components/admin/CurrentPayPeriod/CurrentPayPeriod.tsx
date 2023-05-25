import React from 'react';
import './CurrentPayPeriod.css';

type Props = {
  // where does this data come from? - the database
  // do we just want to display data for employees who had hours in the current pay period?
  currentStartDate: string,
  currentEndDate: string,
  employeeName: string,
  totalHours: number,
  totalTips: number,
  totalReimbursements: number,
  totalTours: number,
  totalDOC: number,
  totalPay: number
}

const CurrentPayPeriod: React.FC<Props> = ({ currentStartDate, currentEndDate, employeeName, totalHours, totalTips, totalReimbursements, totalTours, totalDOC, totalPay }) => {

  return (
    <div>
     {/* <h2>Current Pay Period</h2> */}
     {/* onClick functionality needs to be added */}
     <button>EDIT</button>
      <table>
        {/* how do we determine how many rows to display total? */}
        <thead>
          <tr>
            <th>{currentStartDate} - {currentEndDate}</th>
            <th>Total Hours</th>
            <th>Total Tips</th>
            <th>Total Reimbursements</th>
            <th>Total Tours</th>
            <th>Total DOC</th>
            <th>Total Pay</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {/* how are we going to get the employee name? */}
            <td>{employeeName}</td>
            <td>{totalHours}</td>
            <td>{totalTips}</td>
            <td>{totalReimbursements}</td>
            <td>{totalTours}</td>
            <td>{totalDOC}</td>
            <td>{totalPay}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default CurrentPayPeriod;
