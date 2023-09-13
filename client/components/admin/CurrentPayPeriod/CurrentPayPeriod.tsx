import React from "react";
import './CurrentPayPeriod.css'
import AdminDashboard from '../AdminDashboard/AdminDashboard'
import PayPeriodDisplay from '../PayPeriodDisplay/PayPeriodDisplay';

type PreviousPayPeriodProps = {
    employeeList: [],
    isAdminLoggedIn: boolean
};

const CurrentPayPeriod = (props: PreviousPayPeriodProps) => {

  return (
      <div className="page-container">
        <AdminDashboard isAdminLoggedIn={props.isAdminLoggedIn}/>
        <div className="previous-pay-period-container">
          <h1>Current Pay Period Page!</h1>
          <button>Open EditShift component</button>
          <PayPeriodDisplay start_date={'today'} end_date={'tomorrow'} />
        </div>
    </div>
  )
};

export default CurrentPayPeriod;