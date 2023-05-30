import React, { useContext, useState } from 'react';
import PayPeriodContext from '../../../context/PayPeriodContext';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import './CurrentPayPeriod.css';

type Props = {
  payPeriod: [],
  setPayPeriod: (payPeriod: []) => void,
}

interface Item {
  _id: number,
  pin: string,
  first_name: string,
  last_name: string,
  phone: string,
  email: string,
  hourly_rate: number,
  employee_id: string,
  shift_date: string,
  start_time: string,
  end_time: string,
  tips: number,
  reimbursements: number,
  tours: number,
  doc: number,
}

// revised interface for when we are ready to implement
// interface Item {
//   _id: number,
//   pay_period: string,
//   employee_id: string,
//   first_name: string,
//   last_name: string,
//   total_hours: number,
//   total_minutes: number,
//   total_tips: number,
//   total_reimbursements: number,
//   total_tours: number,
//   total_doc: number,
// }

const CurrentPayPeriod: React.FC<Props> = ({ payPeriod, setPayPeriod }) => {
  const contextObject = useContext(PayPeriodContext);
  // console.log("contextObject", contextObject);
  // console.log("payPeriod", payPeriod);

  // filter by the current pay period
  const displayCurrentPayPeriod = payPeriod
    .filter((item: Item) => {
      const shiftDate = new Date(item.shift_date);
      return shiftDate >= contextObject.currentPayPeriodStart && shiftDate <= contextObject.currentPayPeriodEnd;
    })
  //   .map((payPeriod) => {
  //     return (
  //       <tr>
  //         {/* what is this property called if not employeeName? */}
  //         <td>{payPeriod.employee_id}</td>
  //       </tr>
  //     );
  //   })

  console.log(displayCurrentPayPeriod, "displayCurrentPayPeriod")

  return (
    <div>
     {/* onClick functionality needs to be added */}
     <Button variant="secondary">EDIT</Button>
      <Table striped bordered hover>
        {/* how do we determine how many rows to display total? */}
        <thead>
          <tr>
            <th>{contextObject.formattedCurrentPayPeriod}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {/* <td>{displayCurrentPayPeriod}</td> */}
          </tr>
        </tbody>
      </Table>
    </div>
  )
}

export default CurrentPayPeriod;
