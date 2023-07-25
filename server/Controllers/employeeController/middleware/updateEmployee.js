/**
 * **************************************************
 *
 * @module employeeController.updateEmployee
 *
 * @description
 * Update an employee in the database.
 *
 * **************************************************
 */

require('dotenv').config();
const path = require('path');
const db = require(path.resolve(__dirname, '../../../models/employeeModel'));

const updateEmployee = async (req, res, next) => {
  const { _id } = res.locals.targetEmployee;
  const { pin, first_name, last_name, phone, email, hourly_rate } = req.body;

  try {
    const input = [_id, pin, first_name, last_name, phone, email, hourly_rate];
    let employeeQuery = 'UPDATE employee SET \
     pin = $2, first_name = $3, last_name = $4, phone = $5, email = $6, hourly_rate = $7 ';
    if(_id){
      employeeQuery += `WHERE _id = $1 RETURNING * `;
    }
    const updated = await db.query(employeeQuery, input);
    res.locals.updatedEmployee = updated.rows[0];
    console.log('Successfully updated employee', res.locals.updatedEmployee);
    return next();
  }
  catch(err) {
    return next({
      log: 'employeeController.updateEmployee: ERROR',
      message: {err: 'Error occurred in employeeController.updateEmployee'}
    });
  };
};

module.exports = updateEmployee;