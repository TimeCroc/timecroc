import React, {useState} from "react";
import './CurrentPayPeriod.css';
import AdminDashboard from '../AdminDashboard/AdminDashboard';
import PayPeriodDisplay from '../PayPeriodDisplay/PayPeriodDisplay';

type PreviousPayPeriodProps = {
    employeeList: [],
    isAdminLoggedIn: boolean,
    payPeriodStart: string,
    payPeriodEnd: string
};

const CurrentPayPeriod = (props: PreviousPayPeriodProps) => {
  //logic to determine which date today is
  //make call to new backend endpoint
    //getCurrentPayPeriod will accept a date and return the two week date range it falls into. 

  return (
      <div className="page-container">
        <AdminDashboard isAdminLoggedIn={props.isAdminLoggedIn}/>
        <div className="previous-pay-period-container">
          <h1>Current Pay Period Page!</h1>
          <PayPeriodDisplay payPeriodStart={'Replace Start'} payPeriodEnd={'Replace End'} />
        </div>
    </div>
  )
};

export default CurrentPayPeriod;