const express = require('express');
const adminRouter = express.Router();

const adminController = require('../Controllers/adminController');
const sessionController = require('../Controllers/sessionController');


adminRouter.get('/', sessionController.createSession, sessionController.verifySession, adminController.getAllAdmins, (req, res) => { return res.status(200).json(res.locals.admins); });

adminRouter.get('/:id', sessionController.createSession, sessionController.verifySession, adminController.getAdminById, (req, res) => { return res.status(200).json(res.locals.targetAdmin); });

// remove .verifySession here?
adminRouter.get('/login', sessionController.createSession, sessionController.verifySession, (req, res) => { return res.status(200).json({authenticated: true}); });

adminRouter.post('/', sessionController.createSession, sessionController.verifySession, adminController.createAdmin, (req, res) => { return res.status(200).json(res.locals.newAdmin); });

// router functionality to handle going from successfully logging in (or not) to the admin page 
adminRouter.post('/login', sessionController.createSession, sessionController.verifySession, (req, res) => { return res.status(200).json({authenticated: true}); })


adminRouter.post('/logout', sessionController.endSession, (req, res) => { return res.status(200).json({authenticated: false}); });

adminRouter.put('/:id', adminController.updateAdmin, (req, res) => { return res.status(200).json(res.locals.updatedAdmin); });

adminRouter.delete('/:id', sessionController.createSession, sessionController.verifySession, adminController.deleteAdmin, (req, res) => { return res.status(200).json(res.locals.deletedAdmin); });

module.exports = adminRouter;

