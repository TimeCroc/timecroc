const bcrypt = require("bcrypt");
const path = require('path');
const db = require(path.resolve(__dirname, '../models/adminModel'));
const jwt = require("jsonwebtoken");

const sessionController = {};

sessionController.verifyAdmin = async (req, res) => {
  const { email, admin_password } = req.body;
  try {
    const data = await db.query(`SELECT * FROM admin WHERE email= $1;`, [email]);
    const admin = data.rows;
    if (admin.length === 0) {
      res.status(400).json({error: "Admin is not registered."});
    }
    else {
      bcrypt.compare(admin_password, admin[0].admin_password, (err, result) => {
        if (err) {
          res.status(500).json({error: "Server error."});
        }
        else if (result === true) {
          const token = jwt.sign({email: email}, process.env.SECRET_KEY);
          res.status(200).json({message: "Admin signed in!", token: token});
        }
        else {
          if (result !== true) {
            res.status(400).json({error: "Enter correct password."})
          }
        }
      })
    }
  }
  catch (err) {
    console.log(err);
    res.status(500).json({error: "Database error occurred while signing in"});
  }
}

module.exports = sessionController;