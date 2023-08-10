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
    let req;
    let res;
    let next;
    
    beforeEach(() => {
        jest.clearAllMocks();

        req = {
            body: { email: 'mocha@chai.com', admin_password: 'starbucksneedsaunion' },
            validToken: 'mockValidToken'
        };

        res = {
            status: jest.fn(() => res),
            json: jest.fn()
        };
        next = jest.fn();
    });
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

        await verifySession(req, res, next);

        expect(db.query).toHaveBeenCalledTimes(2);
        expect(bcrypt.compare).toHaveBeenCalledWith('starbucksneedsaunion', mockAdminData.admin_password);
        expect(jwt.verify).toHaveBeenCalledWith(mockValidToken, process.env.JWT_SECRET);
        expect(req.admin).toEqual(mockAdmin);
        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    })
})
