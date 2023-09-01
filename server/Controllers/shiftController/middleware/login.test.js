// require the employeeModel
const db = require('../../../models/employeeModel');

// unit under test
const login = require('./login');

jest.mock('../../../models/employeeModel', () => ({ 
    query: jest.fn()
  }));

describe('login middleware', () => {
  // it should insert a new shift into the database and call next()
  it('should insert a new shift into the database and call next()', async () => {
        
    const mockParams = { pin: '1234' };
    const mockShiftData = { rows: [
      {
        id: 1,
        employee_id: 1,
        shift_date: '2023-01-28',
        start_time: 1672251490489,
        end_time: 1672251517805,
        tips: 100,
        reimbursements: 0,
        tours: 5,
        doc: 0
      }
    ]};

    let mockShiftQuery = 
      ' INSERT INTO shift (\
        employee_id, shift_date, start_time\
      ) VALUES ($1, $2, $3)\
        RETURNING * ';

    const req = { params: mockParams };
    const res = { locals: { targetEmployee: { _id: '1'} } };
    const next = jest.fn();

    db.query.mockResolvedValue(mockShiftData);

    await login(req, res, next);

    expect(db.query).toHaveBeenCalled();
    expect(db.query).toHaveBeenCalledWith(
      mockShiftQuery,
      expect.arrayContaining(['1', expect.any(String), expect.any(Number)])
    );
    expect(res.locals.newShift).toEqual(mockShiftData.rows[0]);
    expect(next).toHaveBeenCalled();
    expect(mockShiftData.rows[0].shift_date).toEqual(expect.any(String));
  })
  
  // it should call next() with an error if the database insertion fails
  it('should call next() with an error if the database insertion fails', async () => {
    const mockParams = { pin: '1234' };
    const mockError = new Error('Database connection error');

    db.query.mockRejectedValue(mockError);

    const req = { params: mockParams };
    const res = { locals: { targetEmployee: { _id: '1'} } };
    const next = jest.fn();

    let mockShiftQuery = 
      ' INSERT INTO shift (\
        employee_id, shift_date, start_time\
      ) VALUES ($1, $2, $3)\
        RETURNING * ';

    await login(req, res, next);

    expect(db.query).toHaveBeenCalledWith(
      mockShiftQuery,
      expect.arrayContaining(['1', expect.any(String), expect.any(Number)])
    );
    expect(next).toHaveBeenCalledWith({
      log: 'shiftController.login: ERROR',
      message: {err: 'Error occurred in shiftController.login'}
    });
  });
});