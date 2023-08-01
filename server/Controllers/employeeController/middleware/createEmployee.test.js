const db = require('../../../models/employeeModel');

// unit under test
const createEmployee = require('./createEmployee');

jest.mock('dotenv');
jest.mock('../../../models/employeeModel', () => ({
  query: jest.fn()
}));

describe('createEmployee middleware', () => {
  it('should create a new employee and call next()', async () => {
    const mockEmployeeData = {
      rows: [
        { id: 1, pin: '9090', first_name: 'Winnie', last_name: 'ThePooh', phone: '2345555555', email: 'poohbear@gmail.com', hourly_rate: 15}
      ]
    };
    const req = { body: { pin: '9090', first_name: 'Winnie', last_name: 'ThePooh', phone: '2345555555', email: 'poohbear@gmail.com', hourly_rate: 15} };
    const res = { locals: {} };
    const next = jest.fn();

    db.query = jest.fn().mockResolvedValue(mockEmployeeData);

    // call createEmployee middleware
    await createEmployee(req, res, next);

    expect(res.locals.newEmployee).toEqual(mockEmployeeData.rows[0]);
    expect(next).toHaveBeenCalledTimes(1);
    });

  it('should call next() with an error message if the database query fails', async () => {
    // mock the db query to throw an error
    const mockError = new Error('Database connection error');
    db.query.mockRejectedValue(mockError);

    const req = { body: { pin: '9090', first_name: 'Winnie', last_name: 'ThePooh', phone: '2345555555', email: 'poohbear@gmail.com', hourly_rate: 15} };
    let res = { locals: {} };

    // mock Jest function for error
    const next = jest.fn();

    // call createEmployee middleware
    await createEmployee(req, res, next);

    expect(next).toHaveBeenCalledWith({log: 'employeeController.createEmployee: ERROR', message: {err: 'Error occurred in employeeController.createEmployee'} });
  })
});

