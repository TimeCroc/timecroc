const express = require('express');
const payPeriodRouter = express.Router();
const path = require('path');
const payPeriodController = require('../Controllers/payPeriodController');
const db = require(path.resolve(__dirname, '../models/employeeModel'));


// route for getting all payperiod data in table
payPeriodRouter.get('/', payPeriodController.getAllPayPeriodData, (req, res) => {
  return res.status(200).json(res.locals.payperiod);
});

// payPeriodRouter.post('/update', payPeriodController.updatePayPeriodTable, (req, res) => {
//   return res.status(200);
// });

// route for currentPayPeriod

// route for previousPayPeriod

module.exports = payPeriodRouter;