const db = require('../../../models/adminModel');

// unit under test
const deleteAdmin = require('./deleteAdmin');

jest.mock('dotenv');
jest.mock('../../../models/adminModel', () => ({
  query: jest.fn()
}));

describe('deleteAdmin middleware', () => {
  it('should delete an admin, set the deletedAdmin in res.locals, and call next()', async () => {
    const req = { params: { id: '1' } };
    const res = { locals: {} };
    const next = jest.fn();

    const mockDeletedAdmin = {
      rows: [
        {
          first_name: 'Polar',
          last_name: 'Seltzer',
          email: 'lemon@polar.com',
          admin_password: 'password123',
        }
      ]
    };

    db.query.mockResolvedValue(mockDeletedAdmin);

    await deleteAdmin(req, res, next);

    expect(db.query).toHaveBeenCalledTimes(1);
    expect(db.query).toHaveBeenCalledWith(
      'DELETE FROM admin WHERE _id = $1 RETURNING * ',
      [req.params.id]
    );
    expect(res.locals.deletedAdmin).toEqual(mockDeletedAdmin.rows[0]);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it('should call next() with an error message if the database query fails', async () => {
    // mock the db query to throw an error
    const mockError = new Error('Database connection error');
    db.query.mockRejectedValue(mockError);

    const req = {
      params: {
        id: '1'
      },
      body: {
        first_name: 'Polar',
        last_name: 'Seltzer',
        email: 'lemon@polar.com',
        admin_password: 'password123',
      }
    };
    const res = {
      locals: {}
    };

    // mock Jest function for error
    const next = jest.fn();

    // call deleteAdmin middleware
    await deleteAdmin(req, res, next);

    expect(next).toHaveBeenCalledWith({log: 'adminController.deleteAdmin: ERROR', message: {err: 'Error occurred in adminController.deleteAdmin'} } );
  });

});

