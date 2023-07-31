import React, { useState, useEffect } from 'react';
import DeleteEmployee from '../DeleteEmployee/DeleteEmployee';
import UpdateEmployee from '../UpdateEmployee/UpdateEmployee';
import AddEmployee from '../AddEmployee/AddEmployee';
import AdminDashboard from '../AdminDashboard/AdminDashboard';
import './EmployeeList.css'

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
    return <li key={list._id}> 
      Employee: {list.first_name} {list.last_name}
        <UpdateEmployee list={list} />
        <DeleteEmployee list={list} />
      </li>
    });

return (
  <div className="page-container">
    <AdminDashboard isAdminLoggedIn={props.isAdminLoggedIn}/>
    <br></br>
    <button className='add-employee-btn'onClick={()=> setAddEmployee(true)}>Add Employee</button>
    {addEmployee && (
      <AddEmployee setAddEmployee={setAddEmployee}/>
    )}
    <h2>Employee List: </h2>
    <ul>
      {display}
    </ul>
  </div>
)
};

export default EmployeeList;