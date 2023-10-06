/**
 * **************************************************
 *
 * @module shiftController.login
 *
 * @description
 * Add new employee shift info to the database upon login.
 *
 * **************************************************
 */

const path = require('path');
const db = require(path.resolve(__dirname, '../../../models/employeeModel'));
// require employeeManager
// const employeeManager = require('./modules/employeeManager')


const login = async (req, res, next) => {
  const { _id } = res.locals.targetEmployee;
  let today = new Date().toDateString();
  const currentTime = Date.now();
  const input = [_id, today, currentTime];
  console.log('input', input)
  try {
    let shiftQuery = 
      ' INSERT INTO shift (\
        employee_id, shift_date, start_time\
      ) VALUES ($1, $2, $3)\
        RETURNING * ';
    const newShift = await db.query(shiftQuery, input);
    res.locals.newShift = newShift.rows[0];
    console.log('shiftController.login: Success', res.locals.newShift);
    
    // need to destructure desired propertires from res.locals.newShift
    const currentEmployeeData = {
      pin: res.locals.targetEmployee.pin,
      firstName: res.locals.targetEmployee.first_name,
      lastName: res.locals.targetEmployee.last_name,
      shiftId: res.locals.newShift._id,
    };

    console.log(currentEmployeeData, 'currentEmployeeData');

    // IDEA: add currentEmployeeData to sessionManager and store in the array as an object
    // sessionManager.addSession(currentEmployeeData);

    // call employeeManager to update employee's status to 'clocked in'
    // const addedEmployee = await employeeManager()

    return next();
  }
  catch(err) {
    return next({
      log: 'shiftController.login: ERROR',
      message: {err: 'Error occurred in shiftController.login'}
    });
  }
}

module.exports = login;