const express = require('express');
const request = require('supertest');
const shiftRouter = require('./shiftRoutes');
const db = require('../models/employeeModel');
const http = require('http');
const app = express();
const server = http.createServer(app);

const employeeController = require('../Controllers/employeeController');
const shiftController = require('../Controllers/shiftController');

// mock the employeeModel
jest.mock('../models/employeeModel', () => ({
  query: jest.fn()
}));

app.use(express.json());
// mount the shiftRouter on the app
app.use('/api/shifts', shiftRouter);

jest.mock('../Controllers/employeeController');
jest.mock('../Controllers/shiftController');

describe('Shift Routes', () => {
  // Clear all mocks before each test
  beforeEach(() => {
    console.log('before the test');
    jest.clearAllMocks();
  });

  // Close the server after each test
  afterEach((done) => {
    console.log('after the test');
    server.close(() => {
      done();
    });
  })

  // Testing route to get all shifts
  describe('/api/shifts/timesheet/:pin', () => {
    describe('GET', () => {
        it('responds with a 200 status and returns all shifts for an employee', async () => {
            const mockEmployeePin = 1234;
            const mockEmployeeData = { id: 1, pin: '1234', first_name: 'Ladybug', last_name: 'Critter', phone: '1235555555', email: 'ladybugisawesome@gmail.com', hourly_rate: 99};
            const mockShiftData = [
              { _id: 123, employee_id: 1, shift_date: '2020-01-01', start_time: 1577836800000, end_time: 1577869200000, tips: 108, reimbursements: 200, tours: 3, doc: 1},
              { _id: 456, employee_id: 1, shift_date: '2020-01-02', start_time: 1577932800000, end_time: 1577965200000, tips: 108, reimbursements: 100, tours: 2, doc: 2}
            ];

            // db.query.mockResolvedValueOnce([mockEmployeeData]).mockResolvedValueOnce({ rows: mockShiftData });

            employeeController.getOneEmployee.mockImplementation((req, res, next) => {
                res.locals.targetEmployee = mockEmployeeData;
                return next();
            })
            shiftController.getAllShifts.mockImplementation((req, res, next) => {
                res.locals.shifts = mockShiftData;
                return next();
            })

            const response = await request(app)
                .get(`/api/shifts/timesheet/${mockEmployeePin}`)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toMatch(/application\/json/);
            expect(response.body).toEqual(mockShiftData);            
        })
    })
  })
  
  // Testing route to get one shift
  // describe('/api/shifts/:pin', () => {
  //   describe('GET', () => {
  //       it('responds with a 200 status and returns one shift', async () => {
  //           const mockEmployeePin = 1234;
  //           const mockEmployeeData = { 
  //               id: 1, pin: '1234', 
  //               first_name: 'Ladybug', 
  //               last_name: 'Critter', 
  //               phone: '1235555555', 
  //               email: 'ladybugisawesome@gmail.com', 
  //               hourly_rate: 99
  //             };
  //           const mockShiftData = {
  //               _id: 123,
  //               employee_id: 1,
  //               shift_date: '2020-01-01',
  //               start_time: 1577836800000,
  //               end_time: 1577869200000,
  //               tips: 108,
  //               reimbursements: 200,
  //               tours: 3,
  //               doc: 1
  //             };

  //             db.query
  //               .mockResolvedValueOnce([mockEmployeeData])
  //               .mockResolvedValueOnce([mockShiftData]);

  //            const response = await request(app)
  //               .get(`/api/shifts/${mockEmployeePin}`)
  //               .expect(200)
  //               .expect('Content-Type', /application\/json/)
                
  //           expect(response.status).toBe(200);
  //           expect(response.headers['content-type']).toMatch(/application\/json/);
  //           expect(response.body).toEqual(mockShiftData);
  //         })
  //       })
  //     })

  // Testing route to start a shift
  // Testing route to end a shift (update)
  // Testing route to update extras
});