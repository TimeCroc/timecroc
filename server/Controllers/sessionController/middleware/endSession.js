/**
 * **************************************************
 *
 * @module sessionController.endSession
 *
 * @description
 * Middleware for ending an authenticated admin session
 *
 * **************************************************
 */

// this middleware should be updated to check which admin's session it is ending
const endSession = (req, res, next) => {
  res.clearCookie("session_id");
  console.log("Session ended");
  next();
};

module.exports = endSession;