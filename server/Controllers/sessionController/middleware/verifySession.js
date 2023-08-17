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

  console.log('inside verifySession');

  try {
    const result = await db.query('SELECT admin_password FROM admin WHERE email = $1', [email]);
    const adminData = result.rows[0];
    console.log('adminData:', adminData)

    if (!adminData) {
      console.log("No admin found with the provided email");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const hash = adminData.admin_password;
    const passwordMatch = await bcrypt.compare(admin_password, hash);

    if (!passwordMatch) {
      console.log("Access denied!");
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = validToken;

    if (!token) {
      return res.status(401).json({ message: "Token undefined" });
    }

    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    let decoded;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (jwtError) {
      if (jwtError.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Invalid token" });
      } else {
        throw jwtError;
      }
    }    
    
    //removed old lines 61-70 bc determined to be unnecessary 
    
    console.log("Access granted!");
    next();
  } 
  catch (err) {
    console.log("Error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = verifySession;
