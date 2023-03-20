const express = require('express');
const shiftRouter = express.Router();
const shiftController = require('../Controllers/shiftController');
const employeeController = require('../Controllers/employeeController');

//get route displays shift info
shiftRouter.get('/timesheet/:pin', employeeController.getOneEmployee, shiftController.getAllshifts, (req, res) => {
  return res.status(200).json(res.locals.shifts);
});

//gets current shift info/status from PinPad component 
shiftRouter.get('/:pin', employeeController.getOneEmployee, shiftController.findShift, (req, res) => {
  return res.status(200).json(res.locals);
});

// POST route starts a new shift
shiftRouter.post('/:pin', employeeController.getOneEmployee, shiftController.login, (req, res) => {
  return res.status(200).json(res.locals.newShift);
});

//update route is for ending a shift
shiftRouter.put('/:pin', shiftController.clockOut, (req, res) => {
  return res.status(200).json(res.locals.updatedShift);
});

shiftRouter.put('/extras/:pin', shiftController.updateExtras, (req, res) => {
  return res.status(200).json(res.locals.updatedExtras);
});

// shiftRouter.delete('/:pin', employeeController.getOneEmployee, shiftController.delete, (req, res) => {
//   return res.status(200).json(res.locals.deleted);
// });

module.exports = shiftRouter;