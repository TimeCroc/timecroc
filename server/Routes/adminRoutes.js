const express = require('express');
const adminRouter = express.Router();

const adminController = require('../controllers/adminController');

adminRouter.get('/', adminController.getAllAdmins, (req, res) => { return res.status(200).json(res.locals.admins); });

adminRouter.get('/:id', adminController.getAdminById, (req, res) => { return res.status(200).json(res.locals.targetAdmin); });

adminRouter.post('/', adminController.createAdmin, (req, res) => { return res.status(200).json(res.locals.newAdmin); });

adminRouter.put('/:id', adminController.updateAdmin, (req, res) => { return res.status(200).json(res.locals.updatedAdmin); });

adminRouter.delete('/:id', adminController.deleteAdmin, (req, res) => { return res.status(200).json(res.locals.deletedAdmin); });

module.exports = adminRouter;