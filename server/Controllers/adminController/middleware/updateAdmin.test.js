const request = require('supertest');

const db = require('../../../models/adminModel');

// unit under test
const updateAdmin = require('./updateAdmin');

jest.mock('dotenv');
jest.mock('../../../models/adminModel', () => ({
  query: jest.fn()
}));

describe('updateAdmin middleware', () => {
  it('should update an admin, set the updatedAdmin in res.locals, and call next()', async () => {
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
    const next = jest.fn();

    const mockUpdatedAdmin = {
      rows: [
        {
          first_name: 'Polar',
          last_name: 'Seltzer',
          email: 'grapefruit@polar.com',
          admin_password: 'over9000',
        }
      ]
    };

    db.query.mockResolvedValue(mockUpdatedAdmin);

    await updateAdmin(req, res, next);

    expect(db.query).toHaveBeenCalledTimes(1);
    expect(db.query).toHaveBeenCalledWith(
      'UPDATE admin SET first_name = $2, last_name = $3, email = $4, admin_password = $5 WHERE _id = $1 RETURNING * ',
      [req.params.id, req.body.first_name, req.body.last_name, req.body.email, req.body.admin_password]
    );
    expect(res.locals.updatedAdmin).toEqual(mockUpdatedAdmin.rows[0]);
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

    // call createAdmin middleware
    await updateAdmin(req, res, next);

    expect(next).toHaveBeenCalledWith({log: 'adminController.updateAdmin: ERROR', message: {err: 'Error occurred in adminController.updateAdmin'} } );
  });
});