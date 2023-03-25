// const bcrypt = require("bcrypt");
// const path = require('path');
// const db = require(path.resolve(__dirname, '../models/adminModel'));
// const jwt = require("jsonwebtoken");

// const sessionController = {};

// sessionController.verifyAdmin = async (req, res) => {
//   const { email, admin_password } = req.body;
//   console.log("email: ", email, "password: ", admin_password);
//   try {
//     const data = await db.query(`SELECT * FROM admin WHERE email= $1;`, [email]);
//     const admin = data.rows;
//     if (admin.length === 0) {
//       res.status(400).json({error: "Admin is not registered."});
//     }
//     else {
//       bcrypt.compare(admin_password, admin[0].admin_password, (err, result) => {
//         if (err) {
//           res.status(500).json({error: "Server error."});
//         }
//         else if (result === true) {
//           const token = jwt.sign({email: email}, process.env.SECRET_KEY);
//           res.status(200).json({message: "Admin signed in!", token: token});
//         }
//         else {
//           if (result !== true) {
//             res.status(400).json({error: "Enter correct password."})
//           }
//         }
//       })
//     }
//   }
//   catch (err) {
//     console.log(err);
//     res.status(500).json({error: "Database error occurred while signing in"});
//   }
// }

// module.exports = sessionController;

// second attempt
// const bcrypt = require("bcrypt");
// const path = require('path');
// const db = require(path.resolve(__dirname, '../models/adminModel'));
// const jwt = require("jsonwebtoken");

// const sessionController = {};
// const secretKey = process.env.SECRET_KEY;

// sessionController.verifyAdmin = async (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1]; // get JWT token from request headers
//   console.log(token)
//   if (!token) {
//     return res.status(401).json({ error: 'No token provided.' });
//   }

//   try {
//     const decoded = jwt.verify(token, secretKey); // decode JWT token
//     const { email } = decoded;

//     const data = await db.query(`SELECT * FROM admin WHERE email= $1;`, [email]);
//     const admin = data.rows;
//     if (admin.length === 0) {
//       return res.status(400).json({ error: "Admin is not registered." });
//     }

//     // add admin object to request for use in other middleware
//     req.admin = admin[0];

//     next(); // proceed to next middleware
//   } catch (err) {
//     console.log(err);
//     res.status(401).json({ error: 'Invalid token.' });
//   }
// };

// module.exports = sessionController;

// third attempt
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const path = require("path");
const db = require(path.resolve(__dirname, "../models/adminModel")); // assuming you have a Admin model defined

const sessionController = {};

sessionController.createSession = async (req, res) => {
  const { email, admin_password } = req.body;

  // find user by email
  const admin = await db.query("SELECT * FROM admin WHERE email = $1", [email]);
  console.log("admin", admin);
  if (!admin.rows[0]) {
    return res.status(401).json({ message: "Invalid email" });
  }

  const inputPassword = await admin.rows[0].admin_password;
  console.log("inputPassword", inputPassword);
  console.log('admin_password', admin_password)
  // check password
  // note: bcrypt.compare returns a promise, and it requires three arguments, the third of which is a callback function that will be called when the promise is resolved
  bcrypt.hash(admin_password, saltRounds, function(err, hash) {
    // Store hash in your password DB
  });

  const validPassword = await bcrypt.compare(admin_password, inputPassword);
  console.log(validPassword, 'validPassword');
  if (!validPassword) {
    return res.status(401).json({ message: "Invalid password" });
  }

  // create JWT
  const token = jwt.sign(
    { email: admin.rows[0].email },
    process.env.JWT_SECRET
  );

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

  res.json({ message: "Session created" });
};

sessionController.verifySession = async (req, res, next) => {
  const token = req.cookies.token; //replace token with session_id
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

module.exports = sessionController;


/* 
const validPassword = await bcrypt.compare(admin_password, admin.rows[0].admin_password, (err, res) => {
  if (err) {
    throw err;
  }
  return res;
});

if (!validPassword) {
  return res.status(401).json({ message: "Invalid password" });
}

*/