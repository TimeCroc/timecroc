/**
 * **************************************************
 *
 * @module shiftController
 *
 * @description
 * Middleware which manages data related to employee shifts.
 *
 * **************************************************
 */

// require each piece of middleware in the chain
const getAllShifts = require('./middleware/getAllShifts');
const findShift = require('./middleware/findShift');
const login = require('./middleware/login');
const updateExtras = require('./middleware/updateExtras');
const clockOut = require('./middleware/clockOut');
const deleteShift = require('./middleware/deleteShift');
const autoClockOut = require('./middleware/autoClockOut');

module.exports = {
  getAllShifts,
  findShift,
  login,
  updateExtras,
  clockOut,
  deleteShift,
  autoClockOut
};