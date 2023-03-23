const express = require('express');
const adminRouter = express.Router();

const adminController = require('../Controllers/adminController');
const sessionController = require('../Controllers/sessionController');

adminRouter.get('/', sessionController.verifyAdmin, adminController.getAllAdmins, (req, res) => { return res.status(200).json(res.locals.admins); });

adminRouter.get('/:id', sessionController.verifyAdmin, adminController.getAdminById, (req, res) => { return res.status(200).json(res.locals.targetAdmin); });

adminRouter.post('/', sessionController.verifyAdmin, adminController.createAdmin, (req, res) => { return res.status(200).json(res.locals.newAdmin); });

adminRouter.put('/:id', sessionController.verifyAdmin, adminController.updateAdmin, (req, res) => { return res.status(200).json(res.locals.updatedAdmin); });

adminRouter.delete('/:id', sessionController.verifyAdmin, adminController.deleteAdmin, (req, res) => { return res.status(200).json(res.locals.deletedAdmin); });

module.exports = adminRouter;