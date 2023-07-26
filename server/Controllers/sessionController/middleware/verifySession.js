/**
 * **************************************************
 *
 * @module sessionController.verifySession
 *
 * @description
 * Verifies an admins login credentials.
 *
 * **************************************************
 */

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const saltRounds = 10;
const path = require("path");
const db = require(path.resolve(__dirname, "../../../models/adminModel"));

const verifySession = async (req, res, next) => {
  const { email, admin_password } = req.body;
  const { validToken } = req;

  db.query('SELECT admin_password FROM admin WHERE email = $1', [email], function(err, rez) {
    if (err) {
      console.log("error in db query of admin's password", err);
      throw err;
    }
    else {
      let hash = rez.rows[0].admin_password;
      //compare hash and password
      bcrypt.compare(admin_password, hash, async function(err, result) {
        if (result) {
          // assigning the token from the cookie to the variable validToken
          const token = validToken;
          console.log("verifySession token", token)
          
          if (!token) {
            return res.status(401).json({ message: "Token not valid" });
          }
          
          try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // could this next line be returning an array, instead of one admin?
            const admin = await db.query("SELECT * FROM admin WHERE email = $1", [
              decoded.email,
            ]);
            console.log("Access granted!")
            if (!admin.rows[0]) {
              return res.status(401).json({ message: "Invalid admin" });
            }

            req.admin = admin;
            
            next();
          } catch (err) {
            return res.status(401).json({ message: "Unexpected error" });
          }
        }
        else {
          console.log("Access denied!")
          return res.status(401).json({ message: "Invalid credentials" });
        }
      })
    }
  });
};

module.exports = verifySession;