/**
 * **************************************************
 *
 * @module shiftController.deleteShift
 *
 * @description
 * Delete employee shift from the database.
 *
 * **************************************************
 */

require('dotenv').config();
const path = require('path');
const db = require(path.resolve(__dirname, '../../../models/employeeModel'));

//needs to be finished
const deleteShift = async (req, res, next) => {
  try {
    const input = [];
    let shiftQuery = 'DELETE FROM shift ';
   if(_id){
     shiftQuery += `WHERE _id = $1 RETURNING * `;
     input.push(_id);
   }
    const deleted = await db.query(shiftQuery, input);
    res.locals.deleted = deleted.rows[0];
    console.log('shiftController.deleted: Success', res.locals.deleted);
    return next();
  }
  catch(err){
    return next({
      log: 'shiftController.deleteShift: ERROR',
      message: {err: 'Error occurred in shiftController.deleteShift'}
    });
  }
};

module.exports = deleteShift;