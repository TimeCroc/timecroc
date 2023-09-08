const db = require('../../../models/employeeModel');

// unit under test
const getAllEmployees = require('./getAllEmployees');

jest.mock('dotenv');
jest.mock('../../../models/employeeModel', () => ({
  query: jest.fn()
}));

describe('getAllEmployees middleware', () => {
  it('should call next() with the employee data in res.locals', async () => {
    // mock the data being returned by the db query
    const mockEmployeeData = {
      rows: [
        { id: 1, pin: '1234', first_name: 'Ladybug', last_name: 'Critter', phone: '1235555555', email: 'ladybugrulez@catmail.com', hourly_rate: 99},
        { id: 2, pin: '4321', first_name: 'Mark', last_name: 'Yencheske', phone: '1235995599', email: 'test@test.com', hourly_rate: 10}
      ]
    };

    db.query.mockResolvedValue(mockEmployeeData);

    let req = {};
    let res = { locals: {} };

    // mock Jest function for next() call
    const next = jest.fn();

    // call getAllEmployees middleware
    await getAllEmployees(req, res, next);

    expect(res.locals.employees).toEqual(mockEmployeeData.rows);
    expect(next).toHaveBeenCalled();
  });

  it('should call next() with an error message if database query fails', async () => {

    // mock the db query to throw an error
    const mockError = new Error('Database connection error');
    db.query.mockRejectedValue(mockError);

    let req = {};
    let res = { locals: {} };

    // mock Jest function for error
    const next = jest.fn();

    // call getAllEmployees middleware
    await getAllEmployees(req, res, next);

    expect(next).toHaveBeenCalledWith('Error in employeeController.getAllEmployees:' + JSON.stringify(mockError));
  });

});