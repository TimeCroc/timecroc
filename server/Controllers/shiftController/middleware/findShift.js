/**
 * **************************************************
 *
 * @module shiftController.findShift
 *
 * @description
 * Get employee shift info from the database.
 *
 * **************************************************
 */

require('dotenv').config();
const path = require('path');
const db = require(path.resolve(__dirname, '../../../models/employeeModel'));

const findShift = async (req, res, next) => {
  const { _id } = res.locals.targetEmployee;
  const input = [];
  try {
     let shiftQuery = 
       ' SELECT * FROM shift ';
     if(_id){
       shiftQuery += `WHERE employee_id = $1 ORDER BY _id ASC `;
       input.push(_id);
     }
     const shift = await db.query(shiftQuery, input);
     //console.log('first pin data', shift);
     res.locals.shift = shift.rows[shift.rows.length - 1];
     console.log('shiftController.findShift: Success', res.locals.shift);
     return next();
   }
   catch(err) {
     return next({
       log: 'shiftController.findShift: ERROR',
       message: {err: 'Error occurred in shiftController.findShift'}
     });
   }
}

module.exports = findShift;