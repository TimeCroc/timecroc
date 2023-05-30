require('dotenv').config();
const path = require('path');
const db = require(path.resolve(__dirname, '../models/employeeModel'));

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
        log: 'no employee found with that id',
        message: {err: 'no employee found with that id'}
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
  const { _id } = res.locals.targetPayPeriod;
  const { payPeriod, employeeId, hours, minutes, tips, reimbursements, tours, doc } = req.body;

  try {
    if (_id) {
      const input = [_id, payPeriod, employeeId, hours, minutes, tips, reimbursements, tours, doc];
      const query = 'UPDATE payperiods SET \
      total_hours = $2, total_minutes = $3, total_tips = $4, total_reimbursements = $5, total_tours = $6, total_doc = $7';
      const updated = await db.query(employeeQuery, input);
      res.locals.updatedPayPeriod = updated.rows[0];
      return next();
    }
  }
  catch(err) {
    return next({
      log: 'payPeriodController.updatePayPeriodTable: ERROR',
      message: {err: 'Error occurred in payPeriodController.updatePayPeriodTable'}
    });
  };
}

// payPeriodController.insertTotalsToDatabase = async (db, payPeriod, employeeId, hours, minutes, tips, reimbursements, tours, doc) => {
//   try {
//     // Construct the SQL INSERT ... ON CONFLICT ... DO UPDATE query
//     const query = `
//       INSERT INTO payperiods (pay_period, employee_id, first_name, last_name, total_hours, total_minutes, total_tips, total_reimbursements, total_tours, total_doc)
//       VALUES (pay_period, ?, (SELECT first_name FROM employee WHERE _id = ?), (SELECT last_name FROM employee WHERE _id = ?), ?, ?, ?, ?, ?, ?)
//       ON CONFLICT (employee_id) DO UPDATE SET
//         total_hours = EXCLUDED.total_hours,
//         total_minutes = EXCLUDED.total_minutes,
//         total_tips = EXCLUDED.total_tips,
//         total_reimbursements = EXCLUDED.total_reimbursements,
//         total_tours = EXCLUDED.total_tours,
//         total_doc = EXCLUDED.total_doc
//     `;
    
//     // Execute the query with the provided values
//     await db.execute(db, [employeeId, employeeId, employeeId, hours, minutes, tips, reimbursements, tours, doc]);

//     console.log('Totals inserted or updated successfully in the payperiods table.');
//   } catch (error) {
//     console.error('Error inserting or updating totals in the payperiods table:', error);
//   }
// };

// payPeriodController.databaseMiddleware = (db) => {
//   return async (req, res, next) => {
//     const { payPeriod, employeeId, hours, minutes, tips, reimbursements, tours, doc } = req.body;
    
//     // Call the function to insert or update totals in the payperiods table
//     await insertTotalsToDatabase(db, payPeriod, employeeId, hours, minutes, tips, reimbursements, tours, doc);

//     // Continue to the next middleware or route handler
//     next();
//   };
// };

module.exports = payPeriodController;