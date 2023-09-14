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

  afterEach((done) => {
    console.log('after the test');
    server.close(() => {
      done();
    });
  })

  // Testing route to get all employees
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

  // Testing route to get one employee
  describe('/api/employees/:pin', () => {
    describe('GET', () => {
      it('responds with a 200 status and returns one employee', (done) => {
        const mockEmployeePin = 1234;
      
        request(app)
          .get(`/api/employees/${mockEmployeePin}`)
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

  // Testing route to create new employee
  describe('/api/employees', () => {
    describe('POST', () => {
      it('responds with a 200 status and creates new employee', (done) => {
        request(app)
          .post('/api/employees')
          .send({
            pin: '9090',
            first_name: 'Winnie',
            last_name: 'ThePooh',
            phone: '2345555555',
            email: 'poohbear@gmail.com',
            hourly_rate: 15
          })
          .expect('Content-Type', /application\/json/)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);

            expect(res.status).toBe(200);
            expect(res.headers['content-type']).toMatch(/application\/json/);

            done();
          })
      })
    })
  })
  
});