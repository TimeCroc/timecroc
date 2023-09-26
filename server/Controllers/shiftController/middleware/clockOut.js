/**
 * **************************************************
 *
 * @module shiftController.clockOut
 *
 * @description
 * Updates employee shift in the database upon logout.
 *
 * **************************************************
 */

const path = require('path');
const db = require(path.resolve(__dirname, '../../../models/employeeModel'));

const clockOut = async (req, res, next) => {
  const { shift_id } = req.body;
  
  const currentTime = Date.now();
  const input = [shift_id, currentTime];
  
  
  try {
    // check to see if currentTime is 3:59am or after Central Time or before 11am Central Time
      if (currentTime % 86400000 >= 14340000 || currentTime % 86400000 <= 39600000) {
        input[1] = currentTime - (currentTime % 86400000) + 14400000;
      }
      // we are expecting that any employee who clocks out after 3:59am Central Time will have their end_time set to 3:59am Central Time
    let shiftQuery = 
      'UPDATE shift SET end_time = $2 '
        if(shift_id){
          shiftQuery += `WHERE _id = $1 RETURNING * `;
        }
    const updatedShift = await db.query(shiftQuery, input);
    res.locals.updatedShift = updatedShift.rows[0];
    console.log('shiftController.clockOut: Success', res.locals.updatedShift);
    return next();
  }
  catch(err) {
    return next({
      log: 'shiftController.clockOut: ERROR',
      message: {err: 'Error occurred in shiftController.clockOut'}
    });
  }
}

module.exports = clockOut;