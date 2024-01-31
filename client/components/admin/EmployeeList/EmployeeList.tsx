import React, { useState, useEffect } from 'react';
import DeleteEmployee from '../DeleteEmployee/DeleteEmployee';
import UpdateEmployee from '../UpdateEmployee/UpdateEmployee';
import AddEmployee from '../AddEmployee/AddEmployee';
import AdminDashboard from '../AdminDashboard/AdminDashboard';
import './EmployeeList.css'
import { Table } from 'react-bootstrap';

interface Employee {
  _id: string;
  pin: string
  first_name: string
  last_name: string
  phone: string
  email: string
  hourly_rate: string
}

type EmployeeListProps = {
  isAdminLoggedIn: boolean
}

const EmployeeList = (props: EmployeeListProps) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [addEmployee, setAddEmployee] = useState(false)
 
  useEffect(() => {
    fetch('/api/employees')
    .then(response => response.json())
    .then((data: Employee[]) => {
      setEmployees(data)
    })
    .catch(err => console.log('error:', err));

  }, []);

  const display = employees.map(list => {
    return <tr>
      <td>{list.first_name} {list.last_name}</td>
      <td>{list.email}</td>
      <td>{list.phone}</td>
      <td><UpdateEmployee list={list} /></td>
      <td><DeleteEmployee list={list}/></td>
    </tr>

    });

return (
  <div className="page-container">
    <AdminDashboard isAdminLoggedIn={props.isAdminLoggedIn}/>

    <div className='employee-list-container'>
    <div>
      <button className='add-employee-btn'onClick={()=> setAddEmployee(true)}>Add Employee</button>
        {addEmployee && (
          <AddEmployee setAddEmployee={setAddEmployee}/>
        )}
    </div>
      <h2>Employee List: </h2>
      <div>
        <Table striped bordered hover>
          <thead>
          <tr>
              <th>Employee Name</th> 
              <th>Email</th>
              <th>Phone</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{display}</tbody>

        </Table>
      </div>
    </div>

  </div>
)
};

export default EmployeeList;