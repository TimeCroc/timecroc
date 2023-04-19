import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DeleteEmployee from './DeleteEmployee';
import UpdateEmployee from './UpdateEmployee';
// import { Employee } from '../../types';

interface Employee {
  _id: string;
  pin: string
  first_name: string
  last_name: string
  phone: string
  email: string
  hourly_rate: string
}

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
 
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
  <div>
    <Link to='/admin'>Back</Link>
    <h2>Employee List: </h2>
    <ul>
      {display}
    </ul>
  </div>
)
};

export default EmployeeList;