require('dotenv').config();
const path = require('path');
const db = require(path.resolve(__dirname, '../models/employeeModel'));

const shiftController = {};

shiftController.getAllEmployeeShifts = async (req, res,  next ) => {
  try {
    const shifts = await db.query('SELECT e.*, s.* FROM public.employee e LEFT JOIN public.shift s ON e."_id" = s."employee_id";');
    res.locals.allShifts = shifts.rows;
    return next();
  }
  catch(err){
    return next('Error in shiftController.getAllEmployeeShifts:' + JSON.stringify(err));
  };
}

shiftController.getAllshifts = async (req, res,  next ) => {
  const { _id } = res.locals.targetEmployee;
  const input = [_id];
  try {
    const shifts = await db.query('SELECT * FROM shift WHERE employee_id = $1', input);
    res.locals.shifts = shifts.rows;
    return next();
  }
  catch(err){
    return next('Error in shiftController.getAllshifts:' + JSON.stringify(err));
  };
}

shiftController.findShift = async (req, res, next) => {
  const { _id } = res.locals.targetEmployee;
  const input = [];
  try {
     let shiftQuery = 
       ' SELECT * FROM shift ';
     if(_id){
       shiftQuery += `WHERE employee_id = $1 ORDER BY _id ASC `;
       input.push(_id);
     }
     const shift = await db.query(shiftQuery, input);
     //console.log('first pin data', shift);
     res.locals.shift = shift.rows[shift.rows.length - 1];
     return next();
   }
   catch(err) {
     return next({
       log: 'shiftController.findShift: ERROR',
       message: {err: 'Error occurred in shiftController.findShift'}
     });
   }
}


shiftController.login = async (req, res, next) => {
  const { _id } = res.locals.targetEmployee;
  let today = new Date().toDateString();
  const currentTime = Date.now();
  const input = [_id, today, currentTime];
  try {
    let shiftQuery = 
      ' INSERT INTO shift (\
        employee_id, shift_date, start_time\
      ) VALUES ($1, $2, $3)\
        RETURNING * ';
    const newShift = await db.query(shiftQuery, input);
    res.locals.newShift = newShift.rows[0];
    return next();
  }
  catch(err) {
    return next({
      log: 'shiftController.login: ERROR',
      message: {err: 'Error occurred in shiftController.login'}
    });
  }
}

shiftController.updateExtras = async (req, res, next) => {
  const { shift_id, tips, tours, reimbursements, doc } = req.body;
  const input = [shift_id, tips, reimbursements, tours, doc];
  try{
    let shiftQuery = 
      ' UPDATE shift SET\
        tips = $2, reimbursements = $3, tours = $4, doc = $5'
        if(shift_id){
          shiftQuery += `WHERE _id = $1 RETURNING * `;
        }
    const updatedExtras = await db.query(shiftQuery, input);
    res.locals.updatedExtras = updatedExtras.rows[0];
    return next();
  }
  catch(err){
    return next({
      log: 'shiftController.updateExtras: ERROR',
      message: {err: 'Error occurred in shiftController.updateExtras'}
    });
  }
}

shiftController.clockOut = async (req, res, next) => {
  const { shift_id } = req.body;
  let endTime = new Date().toLocaleTimeString();
  const currentTime = Date.now();
  const input = [shift_id, currentTime];
  try {
    let shiftQuery = 
      ' UPDATE shift SET\
        end_time = $2 '
        if(shift_id){
          shiftQuery += `WHERE _id = $1 RETURNING * `;
        }
    const updatedShift = await db.query(shiftQuery, input);
    res.locals.updatedShift = updatedShift.rows[0];
    return next();
  }
  catch(err) {
    return next({
      log: 'shiftController.clockOut: ERROR',
      message: {err: 'Error occurred in shiftController.clockOut'}
    });
  }
}

//needs to be finished
shiftController.deleteShift = async (req, res, next) => {
  try {
    const input = [];
    let shiftQuery = 'DELETE FROM shift ';
   if(_id){
     shiftQuery += `WHERE _id = $1 RETURNING * `;
     input.push(_id);
   }
    const deleted = await db.query(shiftQuery, input);
    res.locals.deleted = deleted.rows[0];
    return next();
  }
  catch(err){
    return next({
      log: 'shiftController.deleteShift: ERROR',
      message: {err: 'Error occurred in shiftController.deleteShift'}
    });
  }
};

module.exports = shiftController;