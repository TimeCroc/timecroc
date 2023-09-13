import React, {useState} from "react";
import './PreviousPayPeriod.css';
import AdminDashboard from '../AdminDashboard/AdminDashboard';
import PayPeriodDisplay from '../PayPeriodDisplay/PayPeriodDisplay';

type PreviousPayPeriodProps = {
    employeeList: [],
    isAdminLoggedIn: boolean,
};

const PreviousPayPeriod = (props: PreviousPayPeriodProps) => {
  const [payPeriodStart, setPayPeriodStart] = useState('');
  const [payPeriodEnd, setPayPeriodEnd] = useState('');

  return (
      <div className="page-container">
        <AdminDashboard isAdminLoggedIn={props.isAdminLoggedIn}/>
        <div className="previous-pay-period-container">
          <h1>Previous Pay Periods Page!</h1>
          <button>Open ScrollPayPeriods component</button>
          <button>Open EditShift component</button>
          <PayPeriodDisplay start_date="last week" end_date="also last week" />
        </div>
      </div>
  )
};

export default PreviousPayPeriod;