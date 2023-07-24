// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// const saltRounds = 10;
// const path = require("path");
// const db = require(path.resolve(__dirname, "../models/adminModel"));

// const sessionController = {};
// // declaring a variable validToken, because we need to access the token in the verifySession middleware
// let validToken = '';

// // middleware for logging in an admin
// sessionController.createSession = async (req, res, next) => {
//   const { email, admin_password } = req.body;
//   // find user by email
//   const admin = await db.query("SELECT * FROM admin WHERE email = $1", [email]);
//   if (!admin.rows[0]) {
//     return res.status(401).json({ message: "Invalid email" });
//   }
//     // check password
//     // note: bcrypt.compare returns a promise, and it requires three arguments, the third of which is a callback function that will be called when the promise is resolved
//     // hash the password
//     const hashedPassword = await bcrypt.hash(admin_password, saltRounds);

//     // added functionality for checking password, making sure we do so before we create the session
//     const passwordMatch = await bcrypt.compare(admin_password, admin.rows[0].admin_password);
//     console.log(passwordMatch, 'passwordMatch')
//     if (passwordMatch) {
//       validToken = jwt.sign(
//         { email: admin.rows[0].email },
//         process.env.JWT_SECRET
//       );
//       console.log('createSession token', validToken)
//     }
//     if (!passwordMatch) {
//       return res.status(401).json({ message: "Invalid password" });
//     }

//     // update the password in the database
//     const statement = 'UPDATE admin SET admin_password = $1 WHERE email = $2';
//     const values = [hashedPassword, email];
//     try {
//       await db.query(statement, values);
//       console.log("hashed password updated!");
//     } catch (err) {
//       console.log("error in updating password", err);
//       throw err;
//     }

//   // specify cookie options for production versus development
//   const cookieOptions = {
//     maxAge: 24 * 60 * 60 * 1000, // 1 day
//     secure: process.env.NODE_ENV === "production", // true in production, false otherwise
//     httpOnly: process.env.NODE_ENV === "production", // true in production, false otherwise
//     sameSite: "strict",
//   };

//   if (process.env.NODE_ENV !== "production") {
//     // Disable httpOnly flag in non-production environment
//     cookieOptions.httpOnly = false;
//   }

//   // set cookie
//   res.cookie("session_id", validToken, cookieOptions);
//   console.log("Session created");
//   next();
// };

// sessionController.verifySession = async (req, res, next) => {
//   const { email, admin_password } = req.body;

//   db.query('SELECT admin_password FROM admin WHERE email = $1', [email], function(err, rez) {
//     if (err) {
//       console.log("error in db query of admin's password", err);
//       throw err;
//     }
//     else {
//       let hash = rez.rows[0].admin_password;
//       //compare hash and password
//       bcrypt.compare(admin_password, hash, async function(err, result) {
//         if (result) {
//           // assigning the token from the cookie to the variable validToken
//           const token = validToken;
//           console.log("verifySession token", token)
          
//           if (!token) {
//             return res.status(401).json({ message: "Token not valid" });
//           }
          
//           try {
//             const decoded = jwt.verify(token, process.env.JWT_SECRET);
//             const admin = await db.query("SELECT * FROM admin WHERE email = $1", [
//               decoded.email,
//             ]);
//             console.log("Access granted!")
//             if (!admin.rows[0]) {
//               return res.status(401).json({ message: "Invalid admin" });
//             }

//             req.admin = admin;
            
//             next();
//           } catch (err) {
//             return res.status(401).json({ message: "Unexpected error" });
//           }
//         }
//         else {
//           console.log("Access denied!")
//           return res.status(401).json({ message: "Invalid credentials" });
//         }
//       })
//     }
//   });
// };

// // middleware for logging out admin
// sessionController.endSession = (req, res, next) => {
//   res.clearCookie("session_id");
//   console.log("Session ended");
//   next();
// };

// module.exports = sessionController;