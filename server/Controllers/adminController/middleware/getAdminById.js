/**
 * **************************************************
 *
 * @module adminController.getAdminById
 *
 * @description
 * Retrieve a specific admin by their identifying information
 *
 * **************************************************
 */

require('dotenv').config();
const path = require('path');
const db = require(path.resolve(__dirname, '../../../models/adminModel'));

//using _id as a proxy for pin
const getAdminById = async (req, res, next) => {
  const { _id } = req.params;  
  try {
    const input = [];
    let adminQuery = 'SELECT * FROM admin';
    if(_id){
      adminQuery += `WHERE _id = $1`;
      input.push(_id);
    }
    const target = await db.query(adminQuery, input)
    res.locals.targetAdmin = target.rows[0];
    console.log('targetAdmin', res.locals.targetAdmin);
    //not sure why this doesn't throw and error automatically?
    if (res.locals.targetAdmin === undefined) {
      return next({
        log: 'no admin found with that id',
        message: {err: 'no admin found with that id'}
      });
    }
    console.log('targetAdmin', res.locals.targetAdmin);
    return next();
    }
    catch(err) {
      return next({
        log: 'adminController.getAdminById: ERROR',
        message: {err: 'Error occurred in adminController.getAdminById'}
      });
    }
}

module.exports = getAdminById;