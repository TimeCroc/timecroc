/**
 * **************************************************
 *
 * @module shiftController.updateExtras
 *
 * @description
 * Adds employee extras to the database for current shift.
 *
 * **************************************************
 */

const path = require('path');
const db = require(path.resolve(__dirname, '../../../models/employeeModel'));

const updateExtras = async (req, res, next) => {
  const { shift_id, tips, tours, reimbursements, doc } = req.body;
  const input = [shift_id, tips, reimbursements, tours, doc];
  try{
    console.log('inside the try block of updateExtras.js')
    let shiftQuery = 
      'UPDATE shift SET tips = $2, reimbursements = $3, tours = $4, doc = $5 '
        if(shift_id){
          shiftQuery += `WHERE _id = $1 RETURNING * `;
        }
    const updatedExtras = await db.query(shiftQuery, input);
    res.locals.updatedExtras = updatedExtras.rows[0];
    console.log('shiftController.updateExtras: Success', res.locals.updatedExtras);
    return next();
  }
  catch(err){
    return next({
      log: 'shiftController.updateExtras: ERROR',
      message: {err: 'Error occurred in shiftController.updateExtras'}
    });
  }
}

module.exports = updateExtras;