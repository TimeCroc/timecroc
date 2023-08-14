jest.mock('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../../models/adminModel');

const verifySession = require('./verifySession');

jest.mock('bcrypt', () => ({  
    compare: jest.fn()
}));

// add method inside of here for jwt.verify?
jest.mock('jsonwebtoken', () => ({
    verify: jest.fn()
}));

jest.mock('../../../models/adminModel', () => ({
    query: jest.fn()
}));

describe('verifySession middleware', () => {
    let res;
    let next;
    
    beforeEach(() => {
        jest.clearAllMocks();

        res = {
            status: jest.fn(() => res),
            json: jest.fn()
        };

        next = jest.fn();
    });

    // it should allow an admin access when credentials are valid
    it('should allow an admin access when credentials are valid', async () => {
        const mockAdminData = { id: 1, email: 'mocha@chai.com', admin_password: 'starbucksneedsaunion' };
        const mockValidToken = 'mockValidToken';
        const mockDecode = { email: 'mocha@chai.com' };

        // mock database query results
        db.query.mockResolvedValue({ rows: [mockAdminData] });
        db.query.mockResolvedValueOnce({ rows: [mockAdminData] });

        // mock bcrypt compare to return true
        bcrypt.compare.mockResolvedValue(true);

        //mock jwt verify to return decoded data
        jwt.verify.mockReturnValue(mockDecode);

        const req = {
            body: { email: 'mocha@chai.com', admin_password: 'starbucksneedsaunion' },
            validToken: 'mockValidToken'
        };

        await verifySession(req, res, next);

        expect(db.query).toHaveBeenCalled();
        expect(bcrypt.compare).toHaveBeenCalledWith('starbucksneedsaunion', mockAdminData.admin_password);
        expect(jwt.verify).toHaveBeenCalledWith(mockValidToken, process.env.JWT_SECRET);
        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });
   
  // test for when passwordMatch evaluates to false
  it('should return a 401 status code when passwordMatch is falsy', async () => {
    const mockAdminData = { id: 1, email: 'ladybug@catmail.com', admin_password: 'catnip' };

    bcrypt.compare.mockResolvedValue(false);

    //mock the database
    db.query.mockResolvedValue({ rows: [mockAdminData] });

    const req = {
      body: {
        email: 'ladybug@catmail.com',
        // password is incorrect
        admin_password: 'catfood'
      },
    };

    await verifySession(req, res, next);

    expect(db.query).toHaveBeenCalled();
    expect(bcrypt.compare).toHaveBeenCalledWith('catfood', mockAdminData.admin_password);
    expect(jwt.verify).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid password' });
    expect(next).not.toHaveBeenCalled();
})

// test for when token is undefined
it('should return a 401 status code when token is undefined', async () => {
  const mockAdminData = { id: 1, email: 'email@gmail.com', admin_password: 'spaghetti' };
  const mockValidToken = undefined;

  // mock database query results
  db.query.mockResolvedValue({ rows: [mockAdminData] });

  // mock bcrypt compare to return true
  bcrypt.compare.mockResolvedValue(true);

  const req = {
    body: {
      email: 'email@gmail.com',
      admin_password: 'spaghetti'
    },
    validToken: mockValidToken
  };

  await verifySession(req, res, next);

  expect(db.query).toHaveBeenCalled();
  expect(bcrypt.compare).toHaveBeenCalledWith('spaghetti', mockAdminData.admin_password);
  expect(res.status).toHaveBeenCalledWith(401);
  expect(res.json).toHaveBeenCalledWith({ message: 'Token undefined' });
  expect(next).not.toHaveBeenCalled();
});

  // test for when token is invalid
  it('should return a 401 status code when token is defined but invalid', async () => {
    const mockAdminData = { id: 1, email: 'ladybug@catmail.com', admin_password: 'catnip' };

    // mock database query results
    db.query.mockResolvedValue({ rows: [mockAdminData] });

    // mock bcrypt compare to return true
    bcrypt.compare.mockResolvedValue(true);

    // mock jwt verify to return decoded data
    jwt.verify.mockImplementation(() => {
      const error = new Error('Invalid token');
      error.name = 'JsonWebTokenError'; // Set the error type
      throw error;
    });

    const req = {
      body: {
        email: 'ladybug@catmail.com',
        admin_password: 'catnip'
      },

      // token is defined but invalid
      validToken: 'invalidToken'
    };

    await verifySession(req, res, next);

    expect(db.query).toHaveBeenCalled();
    expect(bcrypt.compare).toHaveBeenCalledWith('catnip', mockAdminData.admin_password);
    expect(jwt.verify).toHaveBeenCalledWith('invalidToken', process.env.JWT_SECRET);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid token' });
    expect(next).not.toHaveBeenCalled();

  });

  // test for when there is a server error
  it('should return a 500 status code when there is a server error', async () => {
    // Mock database query to throw an error
    db.query.mockRejectedValue(new Error('Database error'));
    
    const req = {
      body: {
        email: 'original@vintage.com',
        admin_password: 'seltzer'
      },
      validToken: 'mockValidToken'
    }

    await verifySession(req, res, next);

    expect(db.query).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Internal server error" });
    expect(next).not.toHaveBeenCalled();
  })
});
