
const db = require('../../../models/employeeModel');

// unit under test
const deleteEmployee = require('./deleteEmployee');

jest.mock('dotenv');
jest.mock('../../../models/employeeModel', () => ({
  query: jest.fn()
}));

describe('deleteEmployee middleware', () => {
  it('should delete an employee, set the deletedEmployee in res.locals, and call next()', async () => {
    const req = { params: { id: '1' } };
    const res = { locals: { targetEmployee: { _id: '1' } } };
    const next = jest.fn();

    const mockDeletedEmployee = {
      rows: [
        {
          pin: '1234',
          first_name: 'Jesteer',
          last_name: 'Harlequin',
          phone: '1235551234',
          email: 'jh@jest.io',
          hourly_rate: 69,
        }
      ]
    };

    db.query.mockResolvedValue(mockDeletedEmployee);

    await deleteEmployee(req, res, next);

    expect(db.query).toHaveBeenCalledTimes(1);
    expect(db.query).toHaveBeenCalledWith(
      'DELETE FROM employee WHERE _id = $1 RETURNING * ',
      [req.params.id]
    );
    expect(res.locals.deleted).toEqual(mockDeletedEmployee.rows[0]);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it('should call next() with an error message if the database query fails', async () => {

    const mockError = new Error('Database connection error');
    db.query.mockRejectedValue(mockError);

    const req = { 
      params: { id: '1' },
      body: { 
        pin: '1234',
        first_name: 'Jesteer',
        last_name: 'Harlequin',
        phone: '1235551234',
        email: 'jh@jest.io',
        hourly_rate: 69,
      }
    };

    const res = { locals: { targetEmployee: { _id: '1' } } };

    const next = jest.fn();

    await deleteEmployee(req, res, next);

    expect(next).toHaveBeenCalledWith({
      log: 'employeeController.deleteEmployee: ERROR',
      message: {err: 'Error occurred in employeeController.deleteEmployee'}
    });
  });
});