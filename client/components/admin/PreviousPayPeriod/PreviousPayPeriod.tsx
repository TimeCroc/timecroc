import React from "react";
import './PreviousPayPeriod.css'
import AdminDashboard from '../AdminDashboard/AdminDashboard'

type PreviousPayPeriodProps = {
    employeeList: [],
    isAdminLoggedIn: boolean

};

const PreviousPayPeriod = (props: PreviousPayPeriodProps) => {
    console.log('entered PreviousPayPeriod')

  return (
      <div className="page-container">
        <AdminDashboard isAdminLoggedIn={props.isAdminLoggedIn}/>
        <div className="previous-pay-period-container">
            <h1>Previous Pay Periods Page!</h1>
            <button>Replace with Select component</button>
            <button>Replace with Edit component</button>
            <h2 style={{border: 'solid 1px red'}}>Replace with PayPeriodDisplay component</h2>
        </div>
    </div>
  )

};

export default PreviousPayPeriod;