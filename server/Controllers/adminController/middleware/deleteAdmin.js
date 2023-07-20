 /**
 * **************************************************
 *
 * @module adminController.deleteAdmin
 *
 * @description
 * deletes an admin.
 *
 * **************************************************
 */

require('dotenv').config();
const path = require('path');
const db = require(path.resolve(__dirname, '../../../models/adminModel'));

const deleteAdmin= async (req, res, next) => {
  const { id: _id } = req.params;
  try {
    const input = [];
    let adminQuery = 'DELETE FROM admin ';
   if(_id){
     adminQuery += ` WHERE _id = $1 RETURNING * `;
     input.push(_id);
   }
    const deleted = await db.query(adminQuery, input);
    res.locals.deletedAdmin = deleted.rows[0];
    console.log('deletedAdmin', res.locals.deletedAdmin);
    return next();
  }
  catch(err){
    return next({
      log: 'adminController.deleteAdmin: ERROR',
      message: {err: 'Error occurred in adminController.deleteAdmin'}
    });
  }
};

module.exports = deleteAdmin;