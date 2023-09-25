const express = require('express');
const adminRouter = express.Router();

const adminController = require('../Controllers/adminController');
const sessionController = require('../Controllers/sessionController');

// these two routes are not currently covered by tests
adminRouter.get('/', sessionController.createSession, sessionController.verifySession, adminController.getAllAdmins, (req, res) => { return res.status(200).json(res.locals.admins); });
adminRouter.get('/:id', sessionController.createSession, sessionController.verifySession, adminController.getAdminById, (req, res) => { return res.status(200).json(res.locals.targetAdmin); });

// route for adding admin - currently not a feature that is implemented
// adminRouter.post('/', sessionController.createSession, sessionController.verifySession, adminController.createAdmin, (req, res) => { return res.status(200).json(res.locals.newAdmin); });

// the following two routes are covered by tests
// router functionality to handle going from successfully logging in (or not) to the admin page 
adminRouter.post('/login', sessionController.createSession, sessionController.verifySession, (req, res) => { return res.status(200).json({authenticated: true}); })
adminRouter.post('/logout', sessionController.endSession, (req, res) => { return res.status(200).json({authenticated: false}); });

// these two routes are not currently covered by tests
adminRouter.put('/:id', sessionController.createSession, sessionController.verifySession, adminController.updateAdmin, (req, res) => { return res.status(200).json(res.locals.updatedAdmin); });
adminRouter.delete('/:id', sessionController.createSession, sessionController.verifySession, adminController.deleteAdmin, (req, res) => { return res.status(200).json(res.locals.deletedAdmin); });

module.exports = adminRouter;

