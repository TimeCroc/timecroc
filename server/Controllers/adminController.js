require('dotenv').config();
const path = require('path');
const db = require(path.resolve(__dirname, '../models/adminModel'));

const adminController = {};

adminController.getAllAdmins =  async (req, res, next) => {
  try {
    const admins = await db.query('SELECT * FROM admin');
    res.locals.admins = admins.rows;
    return next();
  }
  catch(err){
    return next('Error in adminController.getAllAdmins:' + JSON.stringify(err));
  };
};

//using admin_password as a proxy for pin
adminController.getOneAdmin = async (req, res, next) => {
  const { admin_password } = req.params;  
  try {
    const input = [];
    let adminQuery = 'SELECT * FROM admin';
    if(admin_password){
      adminQuery += `WHERE admin_password = $1`;
      input.push(admin_password);
    }
    const target = await db.query(adminQuery, input)
    res.locals.targetAdmin = target.rows[0];
    
    //not sure why this doesn't throw and error automatically?
    if (res.locals.targetAdmin === undefined) {
      return next({
        log: 'no admin found with that password',
        message: {err: 'no admin found with that password'}
      });
    }
    return next();
    }
    catch(err) {
      return next({
        log: 'adminController.getOneAdmin: ERROR',
        message: {err: 'Error occurred in adminController.getOneAdmin'}
      });
    }
}
// do not need createAdmin
// do add a testAdmin to the database for us to use or use existing

adminController.createAdmin = async (req, res, next) => {
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
    console.log('newAdmin', res.locals.newAdmin);
    return next();
  }
  catch(err){
    return next({
      log: 'adminController.createAdmin: ERROR',
      message: {err: 'Error occurred in adminController.createAdmin'}
    });
  };
};

adminController.updateAdmin = async (req, res, next) => {
  const { _id } = res.locals.targetAdmin;
  const { first_name, last_name, email, admin_password } = req.body;

  try {
    const input = [_id, first_name, last_name, email, admin_password];
    let adminQuery = 'UPDATE admin SET \
     email = $2, admin_password = $3, first_name = $4, last_name = $5';
    if(_id){
      adminQuery += `WHERE _id = $1 RETURNING * `;
    }
    const updated = await db.query(adminQuery, input);
    res.locals.updatedeAdmin = updated.rows[0];
    return next();
  }
  catch(err) {
    return next({
      log: 'adminController.updateAdmin: ERROR',
      message: {err: 'Error occurred in adminController.updateAdmin'}
    });
  };
};


adminController.deleteAdmin= async (req, res, next) => {
  const { _id } = res.locals.targetAdmin;
  try {
    const input = [];
    let adminQuery = 'DELETE FROM admin ';
   if(_id){
     adminQuery += `WHERE _id = $1 RETURNING * `;
     input.push(_id);
   }
    const deleted = await db.query(adminQuery, input);
    res.locals.deleted = deleted.rows[0];
    return next();
  }
  catch(err){
    return next({
      log: 'adminController.deleteAdmin: ERROR',
      message: {err: 'Error occurred in adminController.deleteAdmin'}
    });
  }
};

module.exports = adminController;