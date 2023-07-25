/**
 * **************************************************
 *
 * @module adminController.updateAdmin
 *
 * @description
 * Update an admin's information in the database.
 *
 * **************************************************
 */


require('dotenv').config();
const path = require('path');
const db = require(path.resolve(__dirname, '../../../models/adminModel'));

const updateAdmin = async (req, res, next) => {
  const { id: _id } = req.params;
  const { first_name, last_name, email, admin_password } = req.body;
	
  try {
    const input = [_id, first_name, last_name, email, admin_password];
		console.log('input', input)
	
    let adminQuery = 'UPDATE admin SET \
     email = $2, admin_password = $3, first_name = $4, last_name = $5';
    if(_id){
      adminQuery += `WHERE _id = $1 RETURNING * `;
    }
    const updated = await db.query(adminQuery, input);
    res.locals.updatedAdmin = updated.rows[0];
    console.log('updatedAdmin', res.locals.updatedAdmin);
    return next();
  }
  catch(err) {
    return next({
      log: 'adminController.updateAdmin: ERROR',
      message: {err: 'Error occurred in adminController.updateAdmin'}
    });
  };
};

module.exports = updateAdmin;