/**
 * **************************************************
 *
 * @module adminController.createAdmin
 *
 * @description
 * Create a new admin in the database.
 *
 * **************************************************
 */


require('dotenv').config();
const path = require('path');
const db = require(path.resolve(__dirname, '../../../models/adminModel'));

const createAdmin = async (req, res, next) => {
  const { first_name, last_name, email, admin_password } = req.body;
  try {
    const input = [first_name, last_name, email, admin_password];
    let newAdminQuery = 
      ' INSERT INTO admin (\
          first_name, last_name, email, admin_password \
        ) VALUES ($1, $2, $3, $4)\
          RETURNING * ';
    const newAdmin = await db.query(newAdminQuery, input);
    res.locals.newAdmin = newAdmin.rows[0];
    // console.log to check if newAdmin is being created
    console.log('Created newAdmin', res.locals.newAdmin);
    return next();
  }
  catch(err){
    return next({
      log: 'adminController.createAdmin: ERROR',
      message: {err: 'Error occurred in adminController.createAdmin'}
    });
  };
};

module.exports = createAdmin;