// require the employeeModel
const db = require('../../../models/employeeModel');

// unit under test
const { clockOut, performClockOut } = require('./clockOut');
// const { clockOut } = require('./clockOut');
// const actualPerformClockOut = require('./clockOut').performClockOut;

// Mock the cron library
const cron = require('node-cron');
// jest.mock('node-cron');

jest.mock('../../../models/employeeModel', () => ({ 
    query: jest.fn()
  }));

jest.mock('node-cron', () => ({
    schedule: jest.fn(),
  }));

// jest.mock('./clockOut', () => ({
//   clockOut: jest.requireActual('./clockOut').clockOut,
//   performClockOut: jest.fn(),
// }));

describe('clockOut middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update the end_time of an existing shift in the database and call next()', async () => {
  const mockParams = { pin: '1234' };
  const mockShiftEndTime = {
    rows: [
      {
        id: 1,
        end_time: Date.now(),
      }
    ]
  }

  const req = { 
    params: mockParams,
    body: { shift_id: 1, end_time: Date.now() } 
    };
  const res = { locals: {} };
  const next = jest.fn();

  db.query.mockResolvedValue(mockShiftEndTime);

  await clockOut(req, res, next);

  expect(db.query).toHaveBeenCalledTimes(1);
  expect(db.query).toHaveBeenCalledWith(
    'UPDATE shift SET end_time = $2 WHERE _id = $1 RETURNING * ',
    [req.body.shift_id, expect.any(Number)]
    );
  expect(res.locals.updatedShift).toEqual(mockShiftEndTime.rows[0]);
  expect(next).toHaveBeenCalledTimes(1);
  });

  it('should call next() with an error if the database update fails', async () => {
    const mockError = new Error('Database connection error');
    db.query.mockRejectedValue(mockError);

    const req = { 
      params: { pin: '1234' },
      body: { shift_id: 1 } 
      };
    const res = { locals: {} };
    const next = jest.fn();

    await clockOut(req, res, next);

    expect(next).toHaveBeenCalledWith({
      log: 'shiftController.clockOut: ERROR',
      message: { err: 'Error occurred in clockOut middleware' },
    });
  });

  it('should schedule a cron job to run performClockOut', () => {
    // create a spy for the performClockOut function
    // const performClockOutSpy = jest.spyOn(performClockOut, 'performClockOut');

      // Mock the cron job schedule
    cron.schedule.mockImplementationOnce((schedule, callback) => {
      // Manually trigger the callback to simulate cron job execution
      callback(req.body.shift_id);
    });

    // Mock the performClockOut function
    // const performClockOut = jest.fn();

    // Replace the performClockOut function with the mock
    // const originalPerformClockOut = performClockOut;
    // performClockOut = performClockOutMock;
  
    // Call the clockOut function with a mock request object that includes the 'pin' parameter
    const req = {
      params: { pin: '1234' }, // Include the 'pin' parameter
      body: { shift_id: 1 } // Include the 'shift_id' parameter
    };

    const res = { locals: {} };
    const next = jest.fn();

    // Mock the console.log function
    // const consoleLogMock = jest.fn();
    // global.console.log = consoleLogMock;
  
    clockOut(req, res, next); // Call the clockOut function with the request object
  

    // Expectations for cron.schedule parameters
    expect(cron.schedule).toHaveBeenCalled();
    expect(cron.schedule).toHaveBeenCalledWith(
    '59 3 * * *', // Ensure the correct schedule
    expect.any(Function), // Ensure the callback is a function
    { scheduled: true, timezone: 'America/Chicago' } // Ensure the correct options
    // expect(performClockOutSpy).toHaveBeenCalledWith(req.body.shift_id);
    // expect(consoleLogMock).toHaveBeenCalledWith('Running automatic clock-out of shift at 3:59 AM Central Time');
    );
    // expect(performClockOut).toHaveBeenCalledWith(req.body.shift_id);

    // clean up the spy
    // performClockOutSpy.mockRestore();

    // restore the original performClockOut function
    // performClockOut = originalPerformClockOut;
    });
  });

// });
