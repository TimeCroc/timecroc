require('dotenv').config();
const path = require('path');
const db = require(path.resolve(__dirname, '../models/employeeModel'));
const ppdb = require(path.resolve(__dirname, '../models/payPeriodModel'));

const payPeriodController = {};

payPeriodController.getAllPayPeriodData = async (req, res,  next) => {
  try {
    const payperiod = await db.query('SELECT * FROM payperiods');
    res.locals.payperiod = payperiod.rows;
    return next();
  }
  catch(err){
    return next('Error in payPeriodController.getAllPayPeriodData:' + JSON.stringify(err));
  };
}

payPeriodController.getOneFromPayPeriodTable = async (req, res, next) => {
  const { _id } = req.params;  
  try {
    const input = [];
    let payPeriodQuery = 'SELECT * FROM payperiods ';
    if(_id){
      payPeriodQuery += `WHERE _id = $1`;
      input.push(_id);
    }
    const target = await db.query(payPeriodQuery, input)
    res.locals.targetPayPeriod = target.rows[0];
    
    //not sure why this doesn't throw and error automatically?
    if (res.locals.targetPayPeriod === undefined) {
      return next({
        log: 'no pay period found with that id',
        message: {err: 'no pay period found with that id'}
      });
    }
    return next();
    }
    catch(err) {
      return next({
        log: 'payPeriodController.getOneFromPayPeriodTable: ERROR',
        message: {err: 'Error occurred in payPeriodController.getOneFromPayPeriodTable'}
      });
    }
} 

payPeriodController.updatePayPeriodTable = async (req, res, next) => {
  const { _id } = req.params;
  const { payPeriod, employeeId, hours, minutes, tips, reimbursements, tours, doc } = req.body;

  try {
    if (_id) {
      const input = [employeeId, hours, minutes, tips, reimbursements, tours, doc, _id];
      const query = 'UPDATE payperiods SET \
        employee_id = $1, total_hours = $2, total_minutes = $3, \
        total_tips = $4, total_reimbursements = $5, total_tours = $6, total_doc = $7 \
        WHERE _id = $8';
      const updated = await db.query(query, input);
      res.locals.updatedPayPeriod = updated.rows[0];
      return next();
    } else {
      const employeeQuery = 'SELECT _id, first_name, last_name FROM employee WHERE _id = $1';
      const employeeResult = await db.query(employeeQuery, [employeeId]);
      const employee = employeeResult.rows[0];

      const input = [
        payPeriod,
        employeeId,
        employee.first_name,
        employee.last_name,
        hours,
        minutes,
        tips,
        reimbursements,
        tours,
        doc
      ];
      const query =
        'INSERT INTO payperiods (\
          pay_period, employee_id, first_name, last_name, total_hours, \
          total_minutes, total_tips, total_reimbursements, total_tours, total_doc \
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)\
        RETURNING *';
      const newPayPeriod = await ppdb.query(query, input);
      res.locals.newPayPeriod = newPayPeriod.rows[0];
      return next();
    }
  } catch (err) {
    return next({
      log: 'payPeriodController.updatePayPeriodTable: ERROR',
      message: { err: err.message }
    });
  }
};

payPeriodController.deletePayPeriod = async (req, res, next) => {
  const { _id } = res.locals.targetPayPeriod;
  try {
    const input = [];
    let query = 'DELETE FROM payperiods ';
    if(_id){
      query += `WHERE _id = $1 RETURNING * `;
      input.push(_id);
    }
    const deleted = await db.query(query, input);
    res.locals.deleted = deleted.rows[0];
    return next();
  }
  catch(err){
    return next({
      log: 'payPeriodController.deletePayPeriod: ERROR',
      message: {err: 'Error occurred in payPeriodController.deletePayPeriod'}
    });
  }
};

module.exports = payPeriodController;