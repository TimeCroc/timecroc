/**
 * **************************************************
 *
 * @module adminController.getAllAdmins
 *
 * @description
 * Retrieve a collection of all admins.
 *
 * **************************************************
 */

// require the model
require('dotenv').config();
const path = require('path');
const db = require(path.resolve(__dirname, '../../../models/adminModel'));

const getAllAdmins =  async (req, res, next) => {
  try {
    const admins = await db.query('SELECT * FROM admin');
    res.locals.admins = admins.rows;
    console.log('admins', res.locals.admins);
    return next();
  }
  catch(err){
    return next('Error in getAllAdmins middleware:' + JSON.stringify(err));
  };
};

module.exports = getAllAdmins;