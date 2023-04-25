const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const path = require("path");
const db = require(path.resolve(__dirname, "../models/adminModel"));

const sessionController = {};

// middleware for logging in an admin
sessionController.createSession = async (req, res, next) => {
  const { email, admin_password } = req.body;
  // find user by email
  const admin = await db.query("SELECT * FROM admin WHERE email = $1", [email]);
  console.log("admin", admin);
  console.log(email, "is logged in")
  if (!admin.rows[0]) {
    return res.status(401).json({ message: "Invalid email" });
  }
    // check password
    // note: bcrypt.compare returns a promise, and it requires three arguments, the third of which is a callback function that will be called when the promise is resolved
    // hash the password
    const hashedPassword = await bcrypt.hash(admin_password, saltRounds);

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

  // create JWT 
  const token = jwt.sign(
    { email: admin.rows[0].email },
    process.env.JWT_SECRET
  );
  console.log(token, 'token')

  const decoded = jwt.decode(token);

  // Check the expiration time ("exp" field)
  if (decoded && decoded.exp) {
    const expirationTime = new Date(decoded.exp * 1000); // Convert from seconds to milliseconds
    const currentTime = new Date();
    if (expirationTime > currentTime) {
      console.log('Token is still valid. Expiration time:', expirationTime);
    } else {
      console.log('Token has expired. Expiration time:', expirationTime);
    }
  } else {
    console.log('Failed to decode token or "exp" field is missing.');
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
  res.cookie("session_id", token, cookieOptions);
  console.log("Session created");
  next();
};

// middleware for verifying an admin's credentials
sessionController.verifySession = async (req, res, next) => {
  const { email, admin_password } = req.body;
  function hasAccess(result) {
    if (result) {
      console.log("Access granted!")
    }
    else {
      console.log("Access denied!")
    }
  }
  
  db.query('SELECT admin_password FROM admin WHERE email = $1', [email], function(err, rez) {
    if (err) {
      console.log("error in db query of admin's password", err);
      throw err;
    }
    else {
      let hash = rez.rows[0].admin_password;
      //compare hash and password
      bcrypt.compare(admin_password, hash, function(err, result) {
        hasAccess(result);
      })
    }
  });

  const token = req.cookies.session_id; // get the token from the cookie
  console.log("verifySession token", token)
  
  if (!token) {
    return res.status(401).json({ message: "Token not valid" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await db.query("SELECT * FROM admin WHERE email = $1", [
      decoded.email,
    ]);
    if (!admin) {
      return res.status(401).json({ message: "Invalid admin" });
    }

    req.admin = admin;
    
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unexpected error" });
  }
};

// middleware for logging out admin
sessionController.endSession = (req, res, next) => {
  res.clearCookie("session_id");
  console.log("Session ended");
  next();
};



module.exports = sessionController;