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

require('dotenv').config();
const path = require('path');
const db = require(path.resolve(__dirname, '../../../models/employeeModel'));

const clockOut = async (req, res, next) => {
  const { shift_id } = req.body;
  let endTime = new Date().toLocaleTimeString();
  const currentTime = Date.now();
  const input = [shift_id, currentTime];
  try {
    let shiftQuery = 
      ' UPDATE shift SET\
        end_time = $2 '
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