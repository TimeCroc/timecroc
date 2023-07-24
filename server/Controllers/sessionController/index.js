/**
 * **************************************************
 *
 * @module sessionController
 *
 * @description
 * What sessionController does...
 *
 * **************************************************
 */

// require each piece of middleware in the chain
const createSession = require('./middleware/createSession');
const verifySession = require('./middleware/verifySession');
const endSession = require('./middleware/endSession');

module.exports = {
  createSession,
  verifySession,
  endSession
};