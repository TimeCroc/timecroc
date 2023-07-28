const express = require('express');
const request = require('supertest');

const db = require('../../../models/adminModel');

// unit under test
const getAllAdmins = require('./getAllAdmins');

jest.mock('dotenv');
jest.mock('../../../models/adminModel', () => ({
  query: jest.fn()
}));

describe('getAllAdmins middleware', () => {
  test('should call next() with the admin data in res.locals', async () => {
    // mock the data being returned by the db query
    const mockAdminData = {
      rows: [
        { id: 1, email: 'example@example.com', password: 'password', first_name: 'Mark', last_name: 'Yencheske'},
        { id: 2, email: 'test@test.com', password: 'jestrules', first_name: 'Ladybug', last_name: 'Critter'}
      ]
    };
    db.query.mockResolvedValue(mockAdminData);

    let req = {};
    let res = { locals: {} };

    // mock Jest function for next() call
    const next = jest.fn();

    // call getAllAdmins middleware
    await getAllAdmins(req, res, next);

    expect(res.locals.admins).toEqual(mockAdminData.rows);
    expect(next).toHaveBeenCalled();
  });

  test('should call next() with an error message if database query fails', async () => {
    // mock the db query to throw an error
    const mockError = new Error('Database connection error');
    db.query.mockRejectedValue(mockError);

    let req = {};
    let res = { locals: {} };

    // mock Jest function for error
    const next = jest.fn();

    // call getAllAdmins middleware
    await getAllAdmins(req, res, next);

    expect(next).toHaveBeenCalledWith('Error in getAllAdmins middleware:' + JSON.stringify(mockError));
  });
});
