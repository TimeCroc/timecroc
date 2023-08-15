// require the employee model
const db = require('../../../models/employeeModel');

// unit under test
const getAllShifts = require('./getAllShifts');

jest.mock('../../../models/employeeModel', () => ({
  query: jest.fn(),
}));

describe('getAllShifts', () => {
  it('should return all shift data, calling next() with the data in res.locals', async () => {
    // mock the target employee
    const mockTargetEmployee = {
      id: 1, pin: '1234', first_name: 'Ladybug', last_name: 'Critter', phone: '1235555555', email: 'ladybugrulez@catmail.com', hourly_rate: 99,
    };

    // params for the request
    const mockParams = { pin: '1234' };

    // mock data for the target employee's shifts 
    const mockShiftData = {
      rows: [ 
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
        },
        {
          id: 2,
          employee_id: 1,
          shift_date: '2020-01-02',
          start_time: 1672253438644,
          end_time: 1672253838208,
          tips: 100,
          reimbursements: 0,
          tours: 5,
          doc: 0
        },
    ]};

    db.query.mockResolvedValue(mockShiftData);

    const req = { params: { pin: '1234' } };
    const res = { locals: { targetEmployee: { _id: '1' } } };
    const next = jest.fn();

    await getAllShifts(req, res, next);

    expect(db.query).toHaveBeenCalled();
    expect(db.query).toHaveBeenCalledWith(
      'SELECT * FROM shift WHERE employee_id = $1',
      [res.locals.targetEmployee._id]
    );
    expect(req.params.pin).toEqual(mockParams.pin);
    expect(res.locals.shifts).toEqual(mockShiftData.rows);
    expect(next).toHaveBeenCalled();
  });
  
  it('should call next() with an error message if database query fails', async () => {
    const mockParams = { pin: '1234' };
    
    const mockError = new Error('Database connection error');
    db.query.mockRejectedValue(mockError);

    const req = { params: { pin: '1234' } };
    const res = { locals: { targetEmployee: { _id: '1' } } };
    const next = jest.fn();

    await getAllShifts(req, res, next);

    expect(req.params.pin).toEqual(mockParams.pin);
    expect(next).toHaveBeenCalledWith('Error in shiftController.getAllShifts:' + JSON.stringify(mockError));
  });
});

