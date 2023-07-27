import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DeleteEmployee from './DeleteEmployee/DeleteEmployee';
import UpdateEmployee from './UpdateEmployee/UpdateEmployee';
import AddEmployee from './AddEmployee/AddEmployee';
import './EmployeeList.styles.css';

interface Employee {
  _id: string;
  pin: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  hourly_rate: string;
}

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

  useEffect(() => {
    fetch('/api/employees')
      .then((response) => response.json())
      .then((data: Employee[]) => {
        setEmployees(data);
      })
      .catch((err) => console.log('error:', err));
  }, []);

  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee);
  };

  // Assuming this code is within your EmployeeList component

  const handleDelete = (employee: Employee) => {
    // Send a DELETE request to the server
    fetch(`/api/employees/${employee}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          console.log('Employee deleted successfully');
        } else {
          throw new Error('Failed to delete employee');
        }
      })
      .catch((error) => {
        console.error('Error deleting employee:', error);
      });
  };

  const display = employees.map((list) => {
    return (
      <tr key={list._id}>
        <td>
          {list.first_name} {list.last_name}
        </td>
        <td>{list.phone}</td>
        <td>{list.email}</td>
        <td>{list.hourly_rate}</td>
        <td>
          <div className='btn-container'>
            <button
              type='button'
              className='btn btn-sm btn-secondary'
              onClick={() => handleEdit(list)}
              data-bs-toggle='modal'
              data-bs-target='#editModal'
            >
              Edit
            </button>
            {/* <div className='btn-container'> */}

            <button
              type='button'
              className='btn btn-sm btn-danger ms-2'
              onClick={() => handleDelete(list)}
              data-bs-toggle='modal'
              data-bs-target='#deleteModal'
            >
              Delete
            </button>
            {/* </div> */}
          </div>
        </td>
      </tr>
    );
  });

  return (
    <div className='button-container '>
      <div className='row'>
        <div className='col-sm-3 button-column'>
          {/* First container */}
          <div className='btn-group-vertical button-link '>
            <button
              type='button'
              className='add-employee btn btn-outline-success me-3 button-link'
            >
              <Link
                className='add-employee'
                to='/admin/add'
                style={{ color: 'green' }}
              >
                Add Employee
              </Link>
            </button>
            <button type='button' className='btn btn-outline-success me-3'>
              Current Pay Period
            </button>
            <button type='button' className='btn btn-outline-success me-3'>
              Previous Pay Period
            </button>
            <button type='button' className='btn btn-outline-success me-3'>
              Employee List
            </button>
          </div>
        </div>
        <div className='col-sm-9'>
          {/* Second container */}
          {/* <h3>Employee List: </h3> */}
          <div className='table-container'>
            <table className='table'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Hourly Rate</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>{display}</tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Edit Modal */}
      {selectedEmployee && (
        <div
          className='modal fade'
          id='editModal'
          tabIndex={-1}
          aria-labelledby='editModalLabel'
          aria-hidden='true'
        >
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title' id='editModalLabel'>
                  Edit Employee
                </h5>
                <button
                  type='button'
                  className='btn-close'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                ></button>
              </div>
              <div className='modal-body'>
                {/* Render the form to edit employee */}
                <UpdateEmployee list={selectedEmployee} />
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-bs-dismiss='modal'
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {selectedEmployee && (
        <div
          className='modal fade'
          id='deleteModal'
          tabIndex={-1}
          aria-labelledby='deleteModalLabel'
          aria-hidden='true'
        >
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title' id='deleteModalLabel'>
                  Delete Employee
                </h5>
                <button
                  type='button'
                  className='btn-close'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                ></button>
              </div>
              <div className='modal-body'>
                {/* Render the delete confirmation */}
                <DeleteEmployee list={selectedEmployee} />
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-bs-dismiss='modal'
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
