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

require('dotenv').config();
const path = require('path');
const db = require(path.resolve(__dirname, '../../../models/employeeModel'));

const login = async (req, res, next) => {
  const { _id } = res.locals.targetEmployee;
  let today = new Date().toDateString();
  const currentTime = Date.now();
  const input = [_id, today, currentTime];
  try {
    let shiftQuery = 
      ' INSERT INTO shift (\
        employee_id, shift_date, start_time\
      ) VALUES ($1, $2, $3)\
        RETURNING * ';
    const newShift = await db.query(shiftQuery, input);
    res.locals.newShift = newShift.rows[0];
    console.log('shiftController.login: Success', res.locals.newShift);
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