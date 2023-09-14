const express = require('express');
const request = require('supertest');
const employeeRouter = require('./employeeRoutes');
const db = require('../models/employeeModel');
const http = require('http');
const app = express();
const server = http.createServer(app);

// mock the employeeModel
jest.mock('../models/employeeModel', () => ({
  query: jest.fn()
}));

app.use(express.json());
// mount the employeeRouter on the app
app.use('/api/employees', employeeRouter);

describe('Employee Routes', () => {
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

  // Testing route to get all employees
  describe('/api/employees', () => {
    describe('GET', () => {
      it('responds with a 200 status and return all employees', async () => {
        // Define mock data for the database query
        const mockEmployeesData = [
            { id: 1, pin: '1234', first_name: 'Ladybug', last_name: 'Critter', phone: '1235555555', email: 'ladybugisawesome@gmail.com', hourly_rate: 99},
            { id: 2, pin: '4321', first_name: 'Mark', last_name: 'Yencheske', phone: '1235995599', email: 'markrulez@gmail.com', hourly_rate: 10}
        ];

        // Mock the behavior of db.query when getting all employees
        db.query.mockResolvedValue({ rows: mockEmployeesData });

        // Send a GET request to get all employees
        const response = await request(app)
          .get('/api/employees')
          .expect(200)
          .expect('Content-Type', /application\/json/)
   
          // Verify the response
          expect(response.status).toBe(200);
          expect(response.headers['content-type']).toMatch(/application\/json/);
          expect(response.body).toEqual(mockEmployeesData);

        });
      });
    });

  // Testing route to get one employee
  describe('/api/employees/:pin', () => {
    describe('GET', () => {
      it('responds with a 200 status and returns one employee', async () => {
        const mockEmployeePin = 1234;
        const mockEmployeeData = { id: 1, pin: '1234', first_name: 'Ladybug', last_name: 'Critter', phone: '1235555555', email: 'ladybugisawesome@gmail.com', hourly_rate: 99};

        db.query.mockResolvedValue({ rows: [mockEmployeeData] });
      
        const response = await request(app)
          .get(`/api/employees/${mockEmployeePin}`)
          .expect(200)
          .expect('Content-Type', /application\/json/)

          expect(response.status).toBe(200);
          expect(response.headers['content-type']).toMatch(/application\/json/);
          expect(response.body).toEqual(mockEmployeeData);
      });
    });
  });

  // Testing route to create new employee
  describe('/api/employees', () => {
    describe('POST', () => {
      it('responds with a 200 status and creates a new employee', async () => {
        // Define mock data for the database query
        const mockNewEmployeeData = {
          id: 123,
          pin: '9090',
          first_name: 'Winnie',
          last_name: 'ThePooh',
          phone: '2345555555',
          email: 'poohbear@gmail.com',
          hourly_rate: 15,
        };

        // Mock the behavior of db.query when creating a new employee
        db.query.mockResolvedValue({ rows: [mockNewEmployeeData] });

        // Send a POST request to create a new employee
        const response = await request(app)
          .post('/api/employees')
          .send({
            pin: '9090',
            first_name: 'Winnie',
            last_name: 'ThePooh',
            phone: '2345555555',
            email: 'poohbear@gmail.com',
            hourly_rate: 15,
          })
          .expect('Content-Type', /application\/json/)
          .expect(200);

        // Verify the response
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/application\/json/);
        expect(response.body).toEqual(mockNewEmployeeData);
      });
    });
  });


  // Testing route to update employee
  describe('/api/employees/:pin', () => {
    describe('PUT', () => {
      it('responds with a 200 status and updates employee', async () => {
        const mockEmployeePin = 9805;
        const mockUpdatedEmployeeData = {
          // id: 123,
          pin: '9805',
          first_name: 'Winnifredson',
          last_name: 'ThePooooooh',
          phone: '9876543210',
          email: 'poohisawesome@gmail.com',
          hourly_rate: 20
        };

        db.query.mockResolvedValue({ rows: [mockUpdatedEmployeeData] });

        const response = await request(app)
          .put(`/api/employees/${mockEmployeePin}`)
          .send({
            pin: '9805',
            first_name: 'Winnifredson',
            last_name: 'ThePooooooh',
            phone: '9876543210',
            email: 'poohisawesome@gmail.com',
            hourly_rate: 20
          })
          .expect('Content-Type', /application\/json/)
          .expect(200);

          expect(response.status).toBe(200);
          expect(response.headers['content-type']).toMatch(/application\/json/);
          expect(response.body).toEqual(mockUpdatedEmployeeData);
          })
        })
      })
    })
// });