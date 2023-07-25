/**
 * **************************************************
 *
 * @module employeeController.getAllEmployees
 *
 * @description
 * Get all employee info from the database.
 *
 * **************************************************
 */

require('dotenv').config();
const path = require('path');
const db = require(path.resolve(__dirname, '../../../models/employeeModel'));

const getAllEmployees =  async (req, res, next) => {
  try {
    const employees = await db.query('SELECT * FROM employee');
    res.locals.employees = employees.rows;
    console.log('Successfully retrieved all employee data');
    return next();
  }
  catch(err){
    return next('Error in employeeController.getAllEmployees:' + JSON.stringify(err));
  };
};

module.exports = getAllEmployees;