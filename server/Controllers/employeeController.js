require('dotenv').config();
const path = require('path');
const db = require(path.resolve(__dirname, '../models/employeeModel'));

const employeeController = {};

employeeController.getAllEmployees =  async (req, res, next) => {
  try {
    const employees = await db.query('SELECT * FROM employee');
    res.locals.employees = employees.rows;
    return next();
  }
  catch(err){
    return next('Error in employeeController.getAllEmployees:' + JSON.stringify(err));
  };
};

employeeController.getOneEmployee = async (req, res, next) => {
  const { pin } = req.params;  
  try {
    const input = [];
    let employeeQuery = 'SELECT * FROM employee ';
    if(pin){
      employeeQuery += `WHERE pin = $1`;
      input.push(pin);
    }
    const target = await db.query(employeeQuery, input)
    res.locals.targetEmployee = target.rows[0];
    
    //not sure why this doesn't throw and error automatically?
    if (res.locals.targetEmployee === undefined) {
      return next({
        log: 'no employee found with that pin',
        message: {err: 'no employee found with that pin'}
      });
    }
    return next();
    }
    catch(err) {
      return next({
        log: 'employeeController.getOneEmployee: ERROR',
        message: {err: 'Error occurred in employeeController.getOneEmployee'}
      });
    }
}

employeeController.createEmployee = async (req, res, next) => {
  const { pin, first_name, last_name, phone, email } = req.body;
  let hourly_rate = 0;
  if(req.body.hourly_rate) {
    hourly_rate = req.body.hourly_rate;
  }
  try {
    const input = [pin, first_name, last_name, phone, email, hourly_rate];
    let newEmployeeQuery = 
      ' INSERT INTO employee (\
          pin, first_name, last_name, phone, email, hourly_rate \
        ) VALUES ($1, $2, $3, $4, $5, $6)\
          RETURNING * ';
    const newEmployee = await db.query(newEmployeeQuery, input);
    res.locals.newEmployee = newEmployee.rows[0];
    return next();
  }
  catch(err){
    return next({
      log: 'employeeController.createEmployee: ERROR',
      message: {err: 'Error occurred in employeeController.createEmployee'}
    });
  };
};

employeeController.updateEmployee = async (req, res, next) => {
  const { _id } = res.locals.targetEmployee;
  const { pin, first_name, last_name, phone, email, hourly_rate } = req.body;

  try {
    const input = [_id, pin, first_name, last_name, phone, email, hourly_rate];
    let employeeQuery = 'UPDATE employee SET \
     pin = $2, first_name = $3, last_name = $4, phone = $5, email = $6, hourly_rate = $7 ';
    if(_id){
      employeeQuery += `WHERE _id = $1 RETURNING * `;
    }
    const updated = await db.query(employeeQuery, input);
    res.locals.updatedEmployee = updated.rows[0];
    return next();
  }
  catch(err) {
    return next({
      log: 'employeeController.updateEmployee: ERROR',
      message: {err: 'Error occurred in employeeController.updateEmployee'}
    });
  };
};


employeeController.deleteEmployee = async (req, res, next) => {
  const { _id } = res.locals.targetEmployee;
  try {
    const input = [];
    let employeeQuery = 'DELETE FROM employee ';
   if(_id){
     employeeQuery += `WHERE _id = $1 RETURNING * `;
     input.push(_id);
   }
    const deleted = await db.query(employeeQuery, input);
    res.locals.deleted = deleted.rows[0];
    return next();
  }
  catch(err){
    return next({
      log: 'employeeController.deleteEmployee: ERROR',
      message: {err: 'Error occurred in employeeController.deleteEmployee'}
    });
  }
};

module.exports = employeeController;