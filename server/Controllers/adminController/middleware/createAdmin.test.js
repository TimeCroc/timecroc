const request = require('supertest');

const db = require('../../../models/adminModel');

// unit under test
const createAdmin = require('./createAdmin');

jest.mock('dotenv');
jest.mock('../../../models/adminModel', () => ({
  query: jest.fn()
}));

describe('createAdmin middleware', () => {
  it('should create a new admin and call next()', async () => {
    const mockAdminData = {
      rows: [
        { id: 1, email: 'testuser@gmail.com', admin_password: 'testpass', first_name: 'Test', last_name: 'User'}
      ]
    };
    const req = { body: { first_name: 'Test', last_name: 'User', email: 'testuser@gmail.com', admin_password: 'testpass' } };
    const res = { locals: {} };
    const next = jest.fn();

    db.query = jest.fn().mockResolvedValue(mockAdminData);

    // call createAdmin middleware
    await createAdmin(req, res, next);
    
    expect(res.locals.newAdmin).toEqual(mockAdminData.rows[0]);
    expect(next).toHaveBeenCalledTimes(1);
    });

  it('should call next() with an error message if the database query fails', async () => {
    // mock the db query to throw an error
    const mockError = new Error('Database connection error');
    db.query.mockRejectedValue(mockError);

    const req = { body: { first_name: 'Test', last_name: 'User', email: 'testuser@gmail.com', admin_password: 'testpass' } };
    let res = { locals: {} };

    // mock Jest function for error
    const next = jest.fn();

    // call createAdmin middleware
    await createAdmin(req, res, next);

    expect(next).toHaveBeenCalledWith({log: 'adminController.createAdmin: ERROR', message: {err: 'Error occurred in adminController.createAdmin'} } );
  })
});




