const request = require('supertest');

const db = require('../../../models/adminModel');

// unit under test
const getAdminById = require('./getAdminById');

jest.mock('dotenv');
jest.mock('../../../models/adminModel', () => ({
  query: jest.fn()
}));

describe('getAdminById middleware', () => {
  it('should set res.locals.targetAdmin and call next()', async () => {
    const mockAdminData = {
      rows: [
        { _id: 1, email: 'email@email.org', password: 'markizcool123', first_name: 'Mark', last_name: 'Smith'},
        { _id: 2, email: 'asd@asdf.com', password: 'asdfasdf', first_name: 'Asdf', last_name: 'Asdf' }
      ]
    }
    const mockParams = { _id: '1'};

    const req = { params: mockParams };
    const res = { locals: {} };
    const next = jest.fn();

    db.query = jest.fn().mockResolvedValue(mockAdminData);

    // call getAdminById middleware
    await getAdminById(req, res, next);

    expect(db.query).toHaveBeenCalledWith('SELECT * FROM admin WHERE _id = $1', ['1']);
    expect(res.locals.targetAdmin).toEqual(mockAdminData.rows[0]);
    expect(next).toHaveBeenCalledTimes(1);
  })

  it('should call next() with an error message if database query fails', async () => {
    const mockParams = { _id: '1' };
    
    // mock the db query to throw an error
     const mockError = new Error('Database connection error');
     db.query = jest.fn().mockRejectedValue(mockError);
 
     let req = { params: mockParams };
     let res = { locals: {} };
 
     // mock Jest function for error
     const next = jest.fn();
 
     // call getAdminById middleware
     await getAdminById(req, res, next);
 
     expect(db.query).toHaveBeenCalledWith('SELECT * FROM admin WHERE _id = $1', ['1']);
     expect(res.locals.targetAdmin).toBeUndefined();
     expect(next).toHaveBeenCalledWith({
      log: 'adminController.getAdminById: ERROR',
      message: {err: 'Error occurred in adminController.getAdminById'}
    });
   });
})