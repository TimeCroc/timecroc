/**
 * **************************************************
 *
 * @module sessionController.createSession
 *
 * @description
 * Middleware for logging in an admin.
 *
 * **************************************************
 */

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const path = require("path");
const db = require(path.resolve(__dirname, "../../../models/adminModel"));

// let validToken = '';

// middleware for logging in an admin
const createSession = async (req, res, next) => {
  const { email, admin_password } = req.body;
  // find user by email
  const admin = await db.query("SELECT * FROM admin WHERE email = $1", [email]);
  if (!admin.rows[0]) {
    return res.status(401).json({ message: "Invalid email" });
  }
    // check password
    // note: bcrypt.compare returns a promise, and it requires three arguments, the third of which is a callback function that will be called when the promise is resolved
    // hash the password
    const hashedPassword = await bcrypt.hash(admin_password, saltRounds);

    // added functionality for checking password, making sure we do so before we create the session
    const passwordMatch = await bcrypt.compare(admin_password, admin.rows[0].admin_password);
    console.log(passwordMatch, 'passwordMatch')
    
    let validToken = '';
    
    if (passwordMatch) {
      // assign the token here
      validToken = jwt.sign(
        { email: admin.rows[0].email },
        process.env.JWT_SECRET
      );
      console.log('createSession token', validToken)
    }
    // set the token as a property on req
    req.validToken = validToken;
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // update the password in the database
    const statement = 'UPDATE admin SET admin_password = $1 WHERE email = $2';
    const values = [hashedPassword, email];
    try {
      await db.query(statement, values);
      console.log("hashed password updated!");
    } catch (err) {
      console.log("error in updating password", err);
      throw err;
    }

  // specify cookie options for production versus development
  const cookieOptions = {
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    secure: process.env.NODE_ENV === "production", // true in production, false otherwise
    httpOnly: process.env.NODE_ENV === "production", // true in production, false otherwise
    sameSite: "strict",
  };

  if (process.env.NODE_ENV !== "production") {
    // Disable httpOnly flag in non-production environment
    cookieOptions.httpOnly = false;
  }

  // set cookie
  res.cookie("session_id", validToken, cookieOptions);
  console.log("Session created");
  next();
};

module.exports = createSession;