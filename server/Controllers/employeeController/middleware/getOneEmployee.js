/**
 * **************************************************
 *
 * @module employeeController.getOneEmployee
 *
 * @description
 * Get the data for one employee from the database.
 *
 * **************************************************
 */

require('dotenv').config();
const path = require('path');
const db = require(path.resolve(__dirname, '../../../models/employeeModel'));

const getOneEmployee = async (req, res, next) => {
  const { pin } = req.params;  
  try {
    const input = [];
    let employeeQuery = 'SELECT * FROM employee ';
    if(pin){
      employeeQuery += `WHERE pin = $1`;
      input.push(pin);
    }
    const target = await db.query(employeeQuery, input)
    res.locals.targetEmployee = target.rows[0];
    
    //not sure why this doesn't throw and error automatically?
    if (res.locals.targetEmployee === undefined) {
      return next({
        log: 'no employee found with that pin',
        message: {err: 'no employee found with that pin'}
      });
    }
    return next();
    }
    catch(err) {
      return next({
        log: 'employeeController.getOneEmployee: ERROR',
        message: {err: 'Error occurred in employeeController.getOneEmployee'}
      });
    }
}

module.exports = getOneEmployee;