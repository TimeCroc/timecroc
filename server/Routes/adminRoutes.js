const express = require('express');
const adminRouter = express.Router();

const adminController = require('../Controllers/adminController');
const sessionController = require('../Controllers/sessionController');

adminRouter.get('/', sessionController.createSession, sessionController.verifySession, adminController.getAllAdmins, (req, res) => { return res.status(200).json(res.locals.admins); });

adminRouter.get('/:id', sessionController.createSession, sessionController.verifySession, adminController.getAdminById, (req, res) => { return res.status(200).json(res.locals.targetAdmin); });

adminRouter.post('/', sessionController.createSession, sessionController.verifySession, adminController.createAdmin, (req, res) => { return res.status(200).json(res.locals.newAdmin); });

adminRouter.post('/logout', sessionController.endSession, (req, res) => { return res.status(200).json({authenticated: false}); });

adminRouter.put('/:id', sessionController.createSession, sessionController.verifySession, adminController.updateAdmin, (req, res) => { return res.status(200).json(res.locals.updatedAdmin); });

adminRouter.delete('/:id', sessionController.createSession, sessionController.verifySession, adminController.deleteAdmin, (req, res) => { return res.status(200).json(res.locals.deletedAdmin); });

module.exports = adminRouter;

// middleware function to check if user has a valid session
// const checkSession = (req, res, next) => {
//   if (!req.session || !req.session.adminId) {
//     return res.status(401).json({ error: "Unauthorized access" });
//   }
//   next();
// };

// // route to get admin information
// adminRouter.get("/", checkSession, async (req, res) => {
//   try {
//     const adminId = req.session.adminId;
//     const query = 'SELECT * FROM admin WHERE id = $1';
//     const { rows } = await db.query(query, [adminId]);

//     if (rows.length === 0) {
//       return res.status(404).json({ error: "Admin not found" });
//     }
//     return res.json(rows[0]);
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ error: "Server error" });
//   }
// });

// // route to log out the admin
// adminRouter.post("/logout", checkSession, (req, res) => {
//   req.session.destroy((err) => {
//     if (err) {
//       console.log(err);
//       return res.status(500).json({ error: "Server error" });
//     }
//     return res.json({ message: "Logged out successfully" });
//   });
// });
