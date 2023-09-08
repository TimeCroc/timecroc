const db = require('../../../models/employeeModel');

// unit under test
const updateEmployee = require('./updateEmployee');

jest.mock('dotenv');
jest.mock('../../../models/employeeModel', () => ({
  query: jest.fn()
}));

describe('updateEmployee middleware', () => {
    it('should update an existing employee and call next()', async () => {
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
          const res = {
            locals: {
                targetEmployee: { _id: '1' }
            }
          };
          const next = jest.fn();
      
          const mockUpdatedEmployee = {
            rows: [
              {
                pin: '8080',
                first_name: 'Puppeteer',
                last_name: 'Harlequin',
                phone: '9996669999',
                email: 'jh@puppeteer.io',
                hourly_rate: 42,
              }
            ]
          };
      
          db.query.mockResolvedValue(mockUpdatedEmployee);
      
          await updateEmployee(req, res, next);
      
          expect(db.query).toHaveBeenCalledTimes(1);
          expect(db.query).toHaveBeenCalledWith(
            'UPDATE employee SET pin = $2, first_name = $3, last_name = $4, phone = $5, email = $6, hourly_rate = $7 WHERE _id = $1 RETURNING * ',
            [req.params.id, req.body.pin, req.body.first_name, req.body.last_name, req.body.phone, req.body.email, req.body.hourly_rate]
          );
          expect(res.locals.updatedEmployee).toEqual(mockUpdatedEmployee.rows[0]);
          expect(next).toHaveBeenCalledTimes(1);
        });

        it('should call next() with an error message if the database query fails', async () => {
            // mock the db query to throw an error
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
            const res = {
                locals: {
                    targetEmployee: { _id: '1' }
                }
            };
        
            // mock Jest function for error
            const next = jest.fn();
        
            // call updateAdmin middleware
            await updateEmployee(req, res, next);
        
            expect(next).toHaveBeenCalledWith({log: 'employeeController.updateEmployee: ERROR', message: {err: 'Error occurred in employeeController.updateEmployee'} } );
          });
})