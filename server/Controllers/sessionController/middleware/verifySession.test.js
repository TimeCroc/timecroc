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
        const mockAdmin = { email: 'mocha@chai.com' };

        // mock database query results
        db.query.mockResolvedValue({ rows: [mockAdminData] });
        db.query.mockResolvedValueOnce({ rows: [mockAdminData] });
        db.query.mockResolvedValueOnce({ rows: [mockAdmin] });

        // mock bcrypt compare to return true
        bcrypt.compare.mockResolvedValue(true);

        //mock jwt verify to return decoded data
        jwt.verify.mockReturnValue(mockDecode);

        const req = {
            body: { email: 'mocha@chai.com', admin_password: 'starbucksneedsaunion' },
            validToken: 'mockValidToken'
        };

        await verifySession(req, res, next);

        expect(db.query).toHaveBeenCalledTimes(2);
        expect(bcrypt.compare).toHaveBeenCalledWith('starbucksneedsaunion', mockAdminData.admin_password);
        expect(jwt.verify).toHaveBeenCalledWith(mockValidToken, process.env.JWT_SECRET);
        expect(req.admin).toEqual(mockAdmin);
        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    })

  // test for when token is undefined
  it('should return a 401 status code when token is undefined', async () => {
    const mockAdminData = { id: 1, email: 'email@gmail.com', admin_password: 'spaghetti' };
    const mockValidToken = undefined;

    // mock database query results
    db.query.mockResolvedValue({ rows: [mockAdminData] });

    const req = {
      body: {
        email: 'email@gmail.com',
        admin_password: 'spaghetti'
      },
      validToken: mockValidToken
    };

    await verifySession(req, res, next);

    expect(db.query).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Token not valid' });
    expect(next).not.toHaveBeenCalled();
  });
  
  // test for when passwordMatch is falsy - involves mocking bcrypt.compare
  // test for when token is invalid/undefined - involves mocking jwt.verify
  // test for when admin is invalid/undefined
  // test for when there is a server error
})
