/**
 * **************************************************
 *
 * @module shiftController.clockOut
 *
 * @description
 * Updates employee shift in the database upon logout.
 *
 * **************************************************
 */

const path = require('path');
const db = require(path.resolve(__dirname, '../../../models/employeeModel'));

// require employeeManager
const employeeManager = require('../../modules/employeeManager');

const clockOut = async (req, res, next) => {
  const { shift_id } = req.body;
  
  const currentTime = Date.now();
  const input = [shift_id, currentTime];
  try {
    console.log('inside the try block of clockOut.js')
    let shiftQuery = 
      'UPDATE shift SET end_time = $2 '
        if(shift_id){
          shiftQuery += `WHERE _id = $1 RETURNING * `;
        }
    const updatedShift = await db.query(shiftQuery, input);
    res.locals.updatedShift = updatedShift.rows[0];
    console.log('shiftController.clockOut: Success', res.locals.updatedShift);

    // assign shiftId key the value from res.locals.updatedShift
    const currentEmployeeData = {
      shiftId: res.locals.updatedShift._id,
    };

    console.log(currentEmployeeData, 'currentEmployeeData in clockOut');
    console.log('current contents of activeEmployees array', employeeManager.activeEmployees);

    // remove currentEmployeeData from sessionManager and remove from the array
    employeeManager.removeActiveEmployee(currentEmployeeData);
    
    const employees = await employeeManager.getActiveEmployees();
    console.log('contents of activeEmployees array after calling .removeActiveEmployee', employees);


    return next();
  }
  catch(err) {
    return next({
      log: 'shiftController.clockOut: ERROR',
      message: {err: 'Error occurred in shiftController.clockOut'}
    });
  }
}

module.exports = clockOut;