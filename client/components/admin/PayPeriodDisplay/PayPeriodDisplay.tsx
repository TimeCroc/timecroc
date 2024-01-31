import React, {useEffect, useState} from 'react';
import Table from 'react-bootstrap/Table';
import EditShift from '../EditShift/EditShift';
import Button from 'react-bootstrap/Button';

interface PayPeriodDisplayProps {
  payPeriodStart: string,
  payPeriodEnd: string,

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
  const [employees, setEmployees] = useState<Employee[]>([])
  const [editshift, setEditShift] = useState(false);
  const { payPeriodStart, payPeriodEnd } = props;

  useEffect(() => {
    fetch('/api/employees')
    .then(response => response.json())
    .then((data) => {
      setEmployees(data)
    })
    .catch(err => console.log('error:', err));

  }, []);

  const display = employees.map(list => {
    return <tr key={list._id}> 
      <td>{list.first_name} {list.last_name} </td>
      <td>tip</td>
      <td>re</td>
      <td>tour</td>
      <td>doc</td>
      <td>extra</td>
      <td>hours</td>
      <td>
      <Button onClick={()=> setEditShift(true)}>Edit Shift</Button>
          {editshift && <EditShift setEditShift={setEditShift}/>}
      </td>
      </tr>
    });

  return (
    <div>
      <h2>PayPeriod: {payPeriodStart} - {payPeriodEnd}</h2>
      <Table striped bordered hover>
          <thead>
            <tr>
              <th>Employee Name</th> 
              <th>Total Tips</th>
              <th>Total Reimbursements</th>
              <th>Total Tours</th>
              <th>Total DOC</th>
              <th>Total Extras</th>
              <th>Total Hours</th>
            </tr>
          </thead>
          <tbody>{display}</tbody>
          <thead>
            <tr>
              <th>Pay Period Totals:</th>
              <th>1</th>
              <th>2</th>
              <th>3</th>
              <th>4</th>
              <th>5</th>
              <th>6</th>
            </tr>
          </thead>
        </Table>
    </div>
  )
};
export default PayPeriodDisplay;