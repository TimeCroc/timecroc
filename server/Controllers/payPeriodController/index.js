/**
 * **************************************************
 *
 * @module payPeriodController
 *
 * @description
 * Middleware which manages data related to employee shifts.
 *
 * **************************************************
 */

const calculatePayPeriod = require('./middleware/calculatePayPeriod');

module.exports = { calculatePayPeriod };