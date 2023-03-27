const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const employeeRouter = require('./Routes/employeeRoutes');
const shiftRouter = require('./Routes/shiftRoutes');
const adminRouter = require('./Routes/adminRoutes');

const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: '*',
  credentials: true
}

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.json());


if(process.env.NODE_ENV === 'production'){
  // statically serve everything in the build folder on the route '/build'
  app.use('/build', express.static(path.join(__dirname, '../build')));

  // serve index.html on the route '/'
  app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../index.html'));
  });
}

//app.use(express.static(__dirname + '../src/build'));
// app.get('/', (req, res) => {
//   return res.status(200).sendFile(path.resolve(__dirname, '../dist/index.html'));
// });

app.use('/api/employees', employeeRouter);

app.use('/api/shifts', shiftRouter);

app.use('/api/admin', adminRouter);

app.use('*', (req, res) => {
 return res.status(404).send('Page Not Found');
});

app.use((err, req, res, next) => {
 const defaultError = {
   log: 'Error handler caught unknown middleware error',
   status: 400,
   message: {err: 'An error occured'}
 }
 const errorObj = Object.assign({}, defaultError, err);
 return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, ()=> {console.log(`Listening on port ${PORT}...`);});

module.exports = app;










// const express = require('express'),
//       path    = require('path'),
//       route   = require('./route.js'),
//       app     = express(),
//       port    = process.env.PORT || 3000;
      
// app.use(express.static(path.resolve(__dirname, '../client/build')));

// route(app);

// app.listen(port);

// console.log(`API server is listening on port:${port}`);

