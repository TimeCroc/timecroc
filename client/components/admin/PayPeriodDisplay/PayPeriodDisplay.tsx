import Table from 'react-bootstrap/Table';
import './PayPeriodDisplay.css';
import { useState, useEffect } from 'react';

type PayPeriodDisplayProps = {
  start_date:  string,
  end_date:  string
}
interface Employee {
  _id: string;
  pin: string
  first_name: string
  last_name: string
  phone: string
  email: string
  hourly_rate: string
}

const PayPeriodDisplay = (props: PayPeriodDisplayProps) => {
//state?
const [employees, setEmployees] = useState<Employee[]>([]);
 
useEffect(() => {
  fetch('/api/employees')
  .then(response => response.json())
  .then((data: Employee[]) => {
    setEmployees(data)
  })
  .catch(err => console.log('error:', err));

}, []);
let displayEmployees;

if(employees){
  console.log('employees', employees)
  displayEmployees = employees.map(emp => {
    console.log(emp);
    return <tr key={emp.pin}> 
      <td>{emp.first_name} {emp.last_name}</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
  })
}else {
  displayEmployees = ['test'];
}
return (
  //table
  <div className={'pay_table'}>
    <h2>{props.start_date} - {props.end_date}</h2>
    <Table striped bordered hover>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Total Hours</th>
              <th>Total Tips</th>
              <th>Total Tours</th>
              <th>Total Reimbursements</th>
              <th>Total DOC</th>
            </tr>
          </thead>
          <tbody>{displayEmployees}</tbody>
          <thead>
            <tr>
              <th>Totals:</th>
              <th>hours</th>
              <th>tips</th>
              <th>tours</th>
              <th>Reimbursements</th>
              <th>DOC</th>
            </tr>
          </thead>
        </Table>
  </div>
)

}

export default PayPeriodDisplay;