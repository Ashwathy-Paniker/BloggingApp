const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const multer  = require('multer');
const jwtSecret = "wewr32vsdfgswfwr2343ert";
//dbconnection
const db = "mongodb://localhost:27017/BlogSpot";
const connectDB = async () => {
  try {
    await mongoose.connect(db, { useNewUrlParser: true });
    console.log("MongoDB connected");
  } catch (err) {
    console.log(err.message);
  }
};
connectDB();
//end

const registermodel = require("../db/RegisterSchema");

// const DIR ="../Neostore/public/images";
// const storage = multer.diskStorage({
//   destination:(req,file,cb)=>{
//     cb(null,DIR);
//   },
//   filename:(req,file,cb)=>{
//     const filename = file.originalname.toLowerCase().split(' ').join('-');
//     cb(null,"user"+'-' + filename)
//   }
// });
// let upload = multer({
//   storage :storage,
//   fileFilter :(req,file,cb)=>{
//     if(file.mimetype =="images/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"){
//       cb(null,true);
//     }
//     else{
//       cb(null,false);
//       return cb(new Error('Only .png , .jpg , .jpeg format allowed'))
//     }
//   }
// })

function autenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token);
  if (token == null) {
    res.json({ err: 1, msg: "Token not match" });
  } else {
    jwt.verify(token, jwtSecret, (err, data) => {
      if (err) {
        res.json({ err: 1, msg: "Token incorrect" });
      } else {
        console.log("Match");
        next();
      }
    });
  }
}

router.post("/adduser", (req, res) => {
  // req.body.password = bcrypt.hashSync(req.body.password, saltRounds);
  registermodel.findOne({ email: req.body.email }, (err, data) => {
    if (err) {
      res.json({ err: 1, msg: "Something went wrong in checking data" });
    } else if (data == null) {
      let ins = new registermodel({
        fname: req.body.fname,
        lname: req.body.lname,
        mobile: req.body.mobile,
        email: req.body.email,
        password: req.body.password,
        gender : req.body.gender,
      });
      ins.save((e) => {
        if (e) {
          res.json({ err: 1, msg: "Something went wrong in adding data" });
        } else {
          res.json({ err: 0, msg: "Registered Successfully !" });
        }
      });
    } else {
      res.json({ err: 0, msg: "User already exist" });
    }
  });
});

router.post("/login", (req, res) => {
  // let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;
  registermodel.findOne({ email: email, password: password }, (err, data) => {
    if (err) {
      res.json({ err: 1, msg: "Email or password is not correct" });
    } else if (data == null) {
      res.json({ err: 1, msg: "Email or password is not correct" });
    } 
    else {
      let payload = {
          uid: email
      }
      const token = jwt.sign(payload, jwtSecret, { expiresIn: 360000 })
      res.json({ "err": 0, "msg": "Login Success", "token": token })
  }
  });
});
