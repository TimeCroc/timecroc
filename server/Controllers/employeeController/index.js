/**
 * **************************************************
 *
 * @module employeeController
 *
 * @description
 * What employeeController does...
 *
 * **************************************************
 */

// require each piece of middleware in the chain
const getAllEmployees = require('./middleware/getAllEmployees');
const getOneEmployee = require('./middleware/getOneEmployee');
const createEmployee = require('./middleware/createEmployee');
const updateEmployee = require('./middleware/updateEmployee');
const deleteEmployee = require('./middleware/deleteEmployee');

module.exports = {
  getAllEmployees,
  getOneEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee
};