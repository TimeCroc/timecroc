const express = require('express');
const request = require('supertest');
const employeeRouter = require('./employeeRoutes');
const http = require('http');

const app = express();
const server = http.createServer(app);

app.use(express.json());
// mount the employeeRouter on the app
app.use('/api/employees', employeeRouter);

describe('Employee Routes', () => {
  afterAll((done) => {
    console.log('after the test');
    server.close(() => {
      done();
    });
  })
  describe('/api/employees', () => {
    describe('GET', () => {
      it('responds with a 200 status and return all employees', (done) => {
        request(app)
          .get('/api/employees')
          .expect(200)
          .expect('Content-Type', /application\/json/)
          .end((err, res) => {
            if(err) return done(err);

            expect(res.status).toBe(200);
            expect(res.headers['content-type']).toMatch(/application\/json/);
            
            done();
          });
      });
    });
  });
});