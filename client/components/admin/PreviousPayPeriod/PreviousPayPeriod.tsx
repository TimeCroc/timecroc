import React, {useState} from "react";
import './PreviousPayPeriod.css'
import AdminDashboard from '../AdminDashboard/AdminDashboard'
import ScrollPayPeriods from '../ScrollPayPeriods/ScrollPayPeriods';

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
          <div className='pay-period-display-placeholder'>
            <h2>PayPeriodDisplay component should display data for:</h2>
            {payPeriodStart} - {payPeriodEnd}
          </div>
        </div>
      </div>
  )
};

export default PreviousPayPeriod;