const express = require('express');
const payPeriodRouter = express.Router();

const payPeriodController = require('../Controllers/payPeriodController');

payPeriodRouter.get('/', payPeriodController.calculatePayPeriod, (req, res) => {
  return res.status(200).json({ calculatePayPeriod: req.payPeriod });
})

module.exports = payPeriodRouter;