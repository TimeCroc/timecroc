jest.mock('dotenv');

// require the admin model
const db = require('../../../models/adminModel');

// unit under test
const createSession = require('./createSession');

// require the bcrypt package
const bcrypt = require('bcrypt');

// require the jwt package
const jwt = require('jsonwebtoken');

// mock the database
jest.mock('../../../models/adminModel', () => ({
  query: jest.fn()
}));

// mock the bcrypt package
jest.mock('bcrypt', () => ({
  hash: jest.fn(),
  compare: jest.fn()
}));

// mock the jwt package
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn()
}));

describe('createSession middleware', () => {
  // it created session successfully, updated hashed password and called next
  it('should create session successfully, update hashed password and call next', async () => {
    // mock the database query
    const mockAdminData = {
      rows: [
        { id: 1, email: 'bluerazz@hemp.com', admin_password: 'salty123' }
      ]
    };

    const req = { body: { email: 'bluerazz@hemp.com', admin_password: 'salty123' } };
    const res = { cookie: jest.fn() };
    const next = jest.fn();

    db.query.mockResolvedValue(mockAdminData);

    let hashedPassword = '1b2a3f4e5d6c7b8a9b0a';

    let mockUpdatedAdminData = {
      rows: [
        { id: 1, email: 'bluerazz@hemp.com', admin_password: '1b2a3f4e5d6c7b8a9b0a' }
      ]
    };

    db.query.mockResolvedValue(mockUpdatedAdminData);

    // mock bcrypt hash and compare functions
    bcrypt.hash = jest.fn().mockResolvedValue(hashedPassword);
    bcrypt.compare = jest.fn().mockResolvedValue(true);

    // mock jwt sign function
    jwt.sign = jest.fn().mockResolvedValue('validToken');

    // call createSession middleware
    await createSession(req, res, next);

    // expect db.query to have been called with the correct arguments
    expect(db.query).toHaveBeenCalledWith('SELECT * FROM admin WHERE email = $1', ['bluerazz@hemp.com']);
    expect(db.query).toHaveBeenCalledWith('UPDATE admin SET admin_password = $1 WHERE email = $2', [hashedPassword, 'bluerazz@hemp.com']);
    // expect bcrypt.hash to have been called
    expect(bcrypt.hash).toHaveBeenCalledWith('salty123', 10);
    // expect bcrypt.compare to have been called
    expect(bcrypt.compare).toHaveBeenCalledWith('salty123', hashedPassword);
    // expect jwt.sign to have been called
    expect(jwt.sign).toHaveBeenCalledWith({ email: 'bluerazz@hemp.com' }, process.env.JWT_SECRET);
    // expect res.cookie to have been called
    expect(res.cookie).toHaveBeenCalled();
    // expect next to have been called
    expect(next).toHaveBeenCalled();
  });

  // it should handle invalid email
  it('should handle invalid email', async () => {
    // mock the database query
    const mockAdminData = {
      rows: []
    }

    const req = { body: { email: 'bluerazz@hemp.com', admin_password: 'salty123' } };
    const res = { 
      // status jest function returns res
      status: jest.fn(() => res),
      cookie: jest.fn(),
      json: jest.fn() 
    };
    const next = jest.fn();

    db.query.mockResolvedValue(mockAdminData);

    // call createSession middleware
    await createSession(req, res, next);

    // expect db.query to have been called with the correct arguments
    expect(db.query).toHaveBeenCalledWith('SELECT * FROM admin WHERE email = $1', ['bluerazz@hemp.com']);
    // expect res.status to have been called with 401
    expect(res.status).toHaveBeenCalledWith(401);
    // expect res.json to have been called with the message 'Invalid email'
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid email' });
    // expect next to not have been called
    expect(next).not.toHaveBeenCalled();
});

// it should handle invalid password
it('should handle invalid password', async () => {
  const mockAdminData = {
    rows: [
      { id: 1, email: 'bluerazz@hemp.com', admin_password: 'hashedPassword' }
    ]
  };

  const req = { body: { email: 'bluerazz@hemp.com', admin_password: 'salty123' } };
  const res = { 
    // status jest function returns res
    status: jest.fn(() => res),
    cookie: jest.fn(),
    json: jest.fn() 
  };
const next = jest.fn();

  db.query.mockResolvedValue(mockAdminData);

  let hashedPassword = '1b2a3f4e5d6c7b8a9b0a';

  // let mockUpdatedAdminData = {
  //   rows: [
  //     { id: 1, email: 'bluerazz@hemp.com', admin_password: '2b2a1bc21dfa12' }
  //   ]
  // };

  // db.query.mockResolvedValue(mockUpdatedAdminData);

  // mock bcrypt hash and compare functions
  // bcrypt.hash = jest.fn().mockResolvedValue(hashedPassword);
  bcrypt.compare = jest.fn().mockResolvedValue(false);

  // call the createSession middleware
  await createSession(req, res, next);

  // expect db.query to have been called with the correct arguments
  expect(db.query).toHaveBeenCalledWith('SELECT * FROM admin WHERE email = $1', ['bluerazz@hemp.com']);
  // expect bcrypt.compare to evaluate to false
  expect(bcrypt.compare).toHaveBeenCalledWith('salty123', 'hashedPassword');
  // expect jwt.sign to not have been called
  // expect(jwt.sign).not.toHaveBeenCalled();
  // expect res.status to have been called with 401
  expect(res.status).toHaveBeenCalledWith(401);
  // expect res.json to have been called with the message 'Invalid password'
  expect(res.json).toHaveBeenCalledWith({ message: 'Invalid password' });
  // expect next to not have been called
  expect(next).not.toHaveBeenCalled();
});
});

