import React, {useState} from "react";
import './PreviousPayPeriod.css'
import AdminDashboard from '../AdminDashboard/AdminDashboard'

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
            <h2 style={{border: 'solid 1px red'}}>Replace with PayPeriodDisplay component</h2>
        </div>
    </div>
  )
};

export default PreviousPayPeriod;