const db = require('../../../models/employeeModel');

// unit under test
const getOneEmployee = require('./getOneEmployee');

jest.mock('dotenv');
jest.mock('../../../models/employeeModel', () => ({
  query: jest.fn()
}));

describe('getOneEmployee middleware', () => {
    it('should set res.locals.targetEmployee and call next()', async () => {
        const mockEmployeeData = {
            rows: [
                { id: 1, pin: '1234', first_name: 'Ladybug', last_name: 'Critter', phone: '1235555555', email: 'ladybugrulez@catmail.com', hourly_rate: 99},
                { id: 2, pin: '4321', first_name: 'Jesse', last_name: 'Cornchips', phone: '1235995599', email: 'jesse@dogmail.com', hourly_rate: 42}
            ]
          }
          const mockParams = { pin: '1234'};
      
          const req = { params: mockParams };
          const res = { locals: {} };
          const next = jest.fn();
      
          db.query = jest.fn().mockResolvedValue(mockEmployeeData);
      
          // call getOneEmployee middleware
          await getOneEmployee(req, res, next);
      
          expect(db.query).toHaveBeenCalledWith('SELECT * FROM employee WHERE pin = $1', ['1234']);
          expect(res.locals.targetEmployee).toEqual(mockEmployeeData.rows[0]);
          expect(next).toHaveBeenCalledTimes(1);
    });
    it('should call next() with an error message if database query fails', async () => {
        const mockParams = { pin: '1234' };
        
        // mock the db query to throw an error
        const mockError = new Error('Database connection error');
        db.query = jest.fn().mockRejectedValue(mockError);
    
        let req = { params: mockParams };
        let res = { locals: {} };
    
        // mock Jest function for error
        const next = jest.fn();
    
        // call getOneEmployee middleware
        await getOneEmployee(req, res, next);
    
        expect(db.query).toHaveBeenCalledWith('SELECT * FROM employee WHERE pin = $1', ['1234']);
        expect(res.locals.targetEmployee).toBeUndefined();
        expect(next).toHaveBeenCalledWith({
        log: 'employeeController.getOneEmployee: ERROR',
        message: {err: 'Error occurred in employeeController.getOneEmployee'}
        });
    });
})