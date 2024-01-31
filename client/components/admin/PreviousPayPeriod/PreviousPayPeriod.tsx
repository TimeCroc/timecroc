import React, {useState} from "react";
import './PreviousPayPeriod.css'
import AdminDashboard from '../AdminDashboard/AdminDashboard'
import ScrollPayPeriods from '../ScrollPayPeriods/ScrollPayPeriods';
import PayPeriodDisplay from "../PayPeriodDisplay/PayPeriodDisplay";

type PreviousPayPeriodProps = {
    employeeList: [],
    isAdminLoggedIn: boolean,
};

const PreviousPayPeriod = (props: PreviousPayPeriodProps) => {
  const [payPeriodStart, setPayPeriodStart] = useState('start');
  const [payPeriodEnd, setPayPeriodEnd] = useState('end');
  const [displayScroll, setDisplayScroll] = useState(false);

  return (
      <div className="page-container">
        <AdminDashboard isAdminLoggedIn={props.isAdminLoggedIn}/>
        <div className="previous-pay-period-container">
          <h1>Previous Pay Periods Page!</h1>
          <button onClick={()=> setDisplayScroll(true)}>Select Pay Period</button>
          {displayScroll && (<ScrollPayPeriods setDisplayScroll={setDisplayScroll} setPayPeriodStart={setPayPeriodStart} setPayPeriodEnd={setPayPeriodEnd}/> )}
          <button>Open EditShift component</button>

          <PayPeriodDisplay payPeriodEnd={payPeriodEnd} payPeriodStart={payPeriodStart} />

        </div>
      </div>
  )
};

export default PreviousPayPeriod;