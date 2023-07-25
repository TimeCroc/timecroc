/**
 * **************************************************
 *
 * @module employeeController.createEmployee
 *
 * @description
 * Create a new employee in the database.
 *
 * **************************************************
 */
require('dotenv').config();
const path = require('path');
const db = require(path.resolve(__dirname, '../../../models/employeeModel'));

const createEmployee = async (req, res, next) => {
  const { pin, first_name, last_name, phone, email } = req.body;
  let hourly_rate = 0;
  if(req.body.hourly_rate) {
    hourly_rate = req.body.hourly_rate;
  }
  try {
    const input = [pin, first_name, last_name, phone, email, hourly_rate];
    let newEmployeeQuery = 
      ' INSERT INTO employee (\
          pin, first_name, last_name, phone, email, hourly_rate \
        ) VALUES ($1, $2, $3, $4, $5, $6)\
          RETURNING * ';
    const newEmployee = await db.query(newEmployeeQuery, input);
    res.locals.newEmployee = newEmployee.rows[0];
    return next();
  }
  catch(err){
    return next({
      log: 'employeeController.createEmployee: ERROR',
      message: {err: 'Error occurred in employeeController.createEmployee'}
    });
  };
};

module.exports = createEmployee;