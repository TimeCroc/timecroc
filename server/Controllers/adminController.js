require('dotenv').config();
const path = require('path');
const db = require(path.resolve(__dirname, '../models/adminModel'));

const adminController = {};

adminController.getAllAdmins =  async (req, res, next) => {
  try {
    const admins = await db.query('SELECT * FROM admin');
    res.locals.admins = admins.rows;
    console.log('admins', res.locals.admins);
    return next();
  }
  catch(err){
    return next('Error in adminController.getAllAdmins:' + JSON.stringify(err));
  };
};

//using _id as a proxy for pin
adminController.getAdminById = async (req, res, next) => {
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

adminController.updateAdmin = async (req, res, next) => {
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


adminController.deleteAdmin= async (req, res, next) => {
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

module.exports = adminController;