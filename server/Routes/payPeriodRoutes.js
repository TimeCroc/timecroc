const express = require('express');
const payPeriodRouter = express.Router();
const payPeriodController = require('../Controllers/payPeriodController');

// route for getting all payperiod data in table
payPeriodRouter.get('/', payPeriodController.getAllPayPeriodData, (req, res) => {
  return res.status(200).json(res.locals.payperiod);
});

payPeriodRouter.put('/update', payPeriodController.updatePayPeriodTable, (req, res) => {
  // Return the updated or new pay period data
  if (res.locals.updatedPayPeriod) {
    res.json({ updatedPayPeriod: res.locals.updatedPayPeriod });
  } else if (res.locals.newPayPeriod) {
    res.json({ newPayPeriod: res.locals.newPayPeriod });
  } else {
    res.sendStatus(404);
  }
});

payPeriodRouter.delete('/:id', payPeriodController.getOneFromPayPeriodTable, payPeriodController.deletePayPeriod, (req, res) => {
  return res.status(200).json(res.locals.deleted);
});

// route for currentPayPeriod

// route for previousPayPeriod

module.exports = payPeriodRouter;