/**
 * **************************************************
 *
 * @module shiftController.clockOut
 *
 * @description
 * Updates employee shift in the database upon logout.
 *
 * **************************************************
 */

const path = require('path');
const cron = require('node-cron');
const db = require(path.resolve(__dirname, '../../../models/employeeModel'));

const performClockOut = async (shift_id) => {
  let currentTime = Date.now();
  const input = [shift_id, currentTime];

  try {
    // Check to see if currentTime is 3:59am Central Time
    if (currentTime % 86400000 === 14340000) {
      input[1] = currentTime - (currentTime % 86400000) + 14340000;
    }

    let shiftQuery = 'UPDATE shift SET end_time = $2 ';
    if (shift_id) {
      shiftQuery += 'WHERE _id = $1 RETURNING * ';
    }

    const updatedShift = await db.query(shiftQuery, input);
    console.log('Automatic Clockout Success', updatedShift.rows[0]);
    return updatedShift.rows[0];
  } catch (err) {
    console.log('shiftController.clockOut: ERROR', err);
    throw err;
  }
};

const clockOut = async (req, res, next) => {
  const { shift_id } = req.body;

  if (!shift_id) {
    return next({
      log: 'shiftController.clockOut: ERROR',
      message: { err: 'Missing shift_id in request body' },
    });
  }

  try {
    const updatedShift = await performClockOut(shift_id);
    res.locals.updatedShift = updatedShift;
    return next();
  } catch (err) {
    return next({
      log: 'shiftController.clockOut: ERROR',
      message: { err: 'Error occurred in clockOut middleware' },
    });
  }
};

// Schedule the middleware to run every day at 3:59 am Central Time
cron.schedule('59 3 * * *', async (shift_id) => {
  console.log('Running automatic clock-out of shift at 3:59 AM Central Time');
  // Call the performClockOut function here
  await performClockOut(shift_id);
}, {
  scheduled: true,
  timezone: 'America/Chicago',
});

module.exports = { clockOut, performClockOut };