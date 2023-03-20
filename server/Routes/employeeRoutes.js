const express = require('express');
const employeeRouter = express.Router();

const employeeController = require('../Controllers/employeeController');

employeeRouter.get('/', employeeController.getAllEmployees, (req, res) => {
  return res.status(200).json(res.locals.employees);
});

employeeRouter.get('/:pin', employeeController.getOneEmployee, (req, res) => {
  return res.status(200).json(res.locals.targetEmployee);
});

employeeRouter.post('/', employeeController.createEmployee, (req, res) => {
  return res.status(200).json(res.locals.newEmployee);
});

employeeRouter.put('/:pin', employeeController.getOneEmployee, employeeController.updateEmployee, (req, res) => {
  return res.status(200).json(res.locals.updatedEmployee);
});

employeeRouter.delete('/:pin', employeeController.getOneEmployee, employeeController.deleteEmployee, (req, res) => {
  return res.status(200).json(res.locals.deleted);
});

module.exports = employeeRouter;