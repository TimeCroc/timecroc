/**
 * **************************************************
 *
 * @module adminController
 *
 * @description
 * What adminController does...
 *
 * **************************************************
 */

// require each piece of middleware in the chain
const getAllAdmins = require('./middleware/getAllAdmins');
const getAdminById = require('./middleware/getAdminById');
const createAdmin = require('./middleware/createAdmin');
const deleteAdmin = require('./middleware/deleteAdmin');
const updateAdmin = require('./middleware/updateAdmin');

module.exports = {
  getAllAdmins,
  getAdminById,
  createAdmin,
  deleteAdmin,
  updateAdmin
};