// require the employee model
const db = require('../../../models/employeeModel');

// unit under test
const findShift = require('./findShift');

jest.mock('../../../models/employeeModel', () => ({
  query: jest.fn(),
}));

describe('findShift middleware', () => {
  // it should call next() with the data for the queried shift
  it('should call next() with the data for the queried shift', async () => {
    const mockParams = { pin: '1234' };
    const mockShift = { rows: [ 
      {
        id: 1,
        employee_id: 1,
        shift_date: '2020-01-01',
        start_time: 1672251490489,
        end_time: 1672251517805,
        tips: 100,
        reimbursements: 0,
        tours: 5,
        doc: 0
      }
    ]};

    db.query.mockResolvedValue(mockShift);

    const req = { params: mockParams };
    const res = { locals: { targetEmployee: {_id: '1' }, shift: {} } };
    const next = jest.fn();

    await findShift(req, res, next);

    expect(db.query).toHaveBeenCalledWith(
      'SELECT * FROM shift WHERE employee_id = $1 ORDER BY _id ASC',
      [res.locals.targetEmployee._id]
    );
    expect(res.locals.shift).toEqual(mockShift.rows[0]);
    expect(next).toHaveBeenCalled();
  });
  
  // it should call next() with an error if the query fails
  it('should call next() with an error message if database query fails', async () => {
    const mockParams = { pin: '1234' };
    const mockError = new Error('Database connection error');

    db.query.mockRejectedValue(mockError);

    const req = { params: mockParams };
    const res = { locals: { targetEmployee: { _id: '1'}, shift: {} } };
    const next = jest.fn();

    await findShift(req, res, next);

    expect(db.query).toHaveBeenCalledWith(
      'SELECT * FROM shift WHERE employee_id = $1 ORDER BY _id ASC',
      [res.locals.targetEmployee._id]
    );
    expect(next).toHaveBeenCalledWith({
      log: 'shiftController.findShift: ERROR',
      message: {err: 'Error occurred in shiftController.findShift'}
    });
  });
});
