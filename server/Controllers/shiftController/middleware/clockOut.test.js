// require the employeeModel
const db = require('../../../models/employeeModel');

// unit under test
const clockOut = require('./clockOut');

jest.mock('../../../models/employeeModel', () => ({ 
    query: jest.fn()
  }));

describe('clockOut middleware', () => {
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
      message: {err: 'Error occurred in shiftController.clockOut'}
    });
  });
});
