// only testing for routes that are currently in use in app

const express = require('express');
const request = require('supertest');
const adminRouter = require('./adminRoutes');
const db = require('../models/adminModel');
const http = require('http');
const app = express();
const server = http.createServer(app);

// mock the adminModel
jest.mock('../models/adminModel', () => ({
  query: jest.fn()
}));

app.use(express.json());
// mount the adminRouter on the app
app.use('/api/admin', adminRouter);

describe('Admin Routes', () => {
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

  // Testing route to login as an admin
  describe ('/api/admin/login', () => {
    describe('POST', () => {
      it('responds with a 200 status and returns authenticated: true', async () => {
        // Define mock data for the database query
        const mockAdminData = [
            { id: 1, email: 'admin', admin_password: '$2a$10$veICQm86W3ehSafrSOIr7utFxiC62YiJLw3zrIDmP3Pt11JjriS0C'}
        ];

        // Mock the behavior of db.query when getting all admins
        db.query.mockResolvedValue({ rows: mockAdminData });

        // Send a POST request to login as an admin
        const response = await request(app)
          .post('/api/admin/login')
          .send({email: 'admin', admin_password: 'admin'})
          .expect(200)
          .expect('Content-Type', /application\/json/)
   
        // Verify the response
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/application\/json/);
        expect(response.body).toEqual({authenticated: true});

        });
      });
    });
});
