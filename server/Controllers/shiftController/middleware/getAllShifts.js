/**
 * **************************************************
 *
 * @module shiftController.getAllShifts
 *
 * @description
 * Get all employee shifts info from the database.
 *
 * **************************************************
 */

const path = require('path');
const db = require(path.resolve(__dirname, '../../../models/employeeModel'));

const getAllShifts = async (req, res,  next ) => {
  const { _id } = res.locals.targetEmployee;
  const input = [_id];
  try {
    const shifts = await db.query('SELECT * FROM shift WHERE employee_id = $1', input);
    res.locals.shifts = shifts.rows;
    console.log('shiftController.getAllShifts: Success');
    return next();
  }
  catch(err){
    return next('Error in shiftController.getAllShifts:' + JSON.stringify(err));
  };
}

module.exports = getAllShifts;