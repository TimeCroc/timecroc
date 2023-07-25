/**
 * **************************************************
 *
 * @module employeeController.deleteEmployee
 *
 * @description
 * Delete an employee in the database.
 *
 * **************************************************
 */

require('dotenv').config();
const path = require('path');
const db = require(path.resolve(__dirname, '../../../models/employeeModel'));

const deleteEmployee = async (req, res, next) => {
  const { _id } = res.locals.targetEmployee;
  try {
    const input = [];
    let employeeQuery = 'DELETE FROM employee ';
   if(_id){
     employeeQuery += `WHERE _id = $1 RETURNING * `;
     input.push(_id);
   }
    const deleted = await db.query(employeeQuery, input);
    res.locals.deleted = deleted.rows[0];
    console.log('Successfully deleted employee', res.locals.deleted)
    return next();
  }
  catch(err){
    return next({
      log: 'employeeController.deleteEmployee: ERROR',
      message: {err: 'Error occurred in employeeController.deleteEmployee'}
    });
  }
};

module.exports = deleteEmployee;