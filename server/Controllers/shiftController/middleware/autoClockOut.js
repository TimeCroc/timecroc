/**
 * **************************************************
 *
 * @module shiftController.autoClockOut
 *
 * @description
 * Automatically clocks out employee at designated time daily.
 *
 * **************************************************
 */

const path = require('path');
const db = require(path.resolve(__dirname, '../../../models/employeeModel'));

const cron = require('node-cron');

const autoClockOut = async (req, res, next) => {
  // console.log('inside autoClockOut');
  cron.schedule('59 3 * * *', async () => {
    try {
      const currentTime = Date.now();
      const input = [currentTime];
      const updatedShift = await db.query('UPDATE shift SET end_time = $1 WHERE end_time IS NULL RETURNING *', input);
      // note: not hitting this console log, but the code is working and database is being updated as expected
      res.locals.updatedShift = updatedShift.rows;
      console.log('shiftController.autoClockOut: Success', res.locals.updatedShift);
      return next();
    }
    catch(err) {
      return next({
        log: 'shiftController.autoClockOut: ERROR',
        message: {err: 'Error occurred in shiftController.autoClockOut'}
      });
    }
  }, {
    scheduled: true,
    timezone: 'America/Chicago',
  });
}

module.exports = autoClockOut;