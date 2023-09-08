// require the employeeModel
const db = require('../../../models/employeeModel');

// require the middleware
const updateExtras = require('./updateExtras');

jest.mock('../../../models/employeeModel', () => ({
  query: jest.fn()
}));

describe('updateExtras middleware', () => {
  it('should call next when successful with updatedExtras on res.locals', async () => {
    const mockParams = { pin: '1234' };
    
    const req = { 
      params: mockParams,
      body: {
        shift_id: 1,
        tips: 100,
        reimbursements: 0,
        tours: 5,
        doc: 0
      }
    };
    const res = { locals: {} };
    const next = jest.fn();

    const mockUpdatedExtras = {
      rows: [
        {
          shift_id: 1,
          tips: 108,
          reimbursements: 50,
          tours: 10,
          doc: 1,
        }        
      ]
    }

    db.query.mockResolvedValue(mockUpdatedExtras);
      
    await updateExtras(req, res, next);

    expect(db.query).toHaveBeenCalledTimes(1);
    expect(db.query).toHaveBeenCalledWith(
      'UPDATE shift SET tips = $2, reimbursements = $3, tours = $4, doc = $5 WHERE _id = $1 RETURNING * ',
      [req.body.shift_id, req.body.tips, req.body.reimbursements, req.body.tours, req.body.doc]
    );
    expect(res.locals.updatedExtras).toEqual(mockUpdatedExtras.rows[0]);
    expect(next).toHaveBeenCalledTimes(1);
  })

  it('should call next() with an error if the database insertion is unsuccessful', async () => {
    const mockError = new Error('Database connection error');
    db.query.mockRejectedValue(mockError);

    const req = {
      params: { pin: '1234' },
      body: {
        shift_id: 1,
        tips: 100,
        reimbursements: 0,
        tours: 5,
        doc: 0
      }
    };

    const res = { locals: {} };
    const next = jest.fn();

    await updateExtras(req, res, next);

    expect(next).toHaveBeenCalledWith({log: 'shiftController.updateExtras: ERROR',
    message: {err: 'Error occurred in shiftController.updateExtras'}
    });
  });
});