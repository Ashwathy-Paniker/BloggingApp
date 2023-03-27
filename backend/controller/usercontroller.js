const registermodel = require('../model/RegisterSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const jwtSecret = "wewr32vsdfgswfwr2343ert";
const { check, validationResult } = require('express-validator');


const usercontroller = {

    register: async (req, res) => {
        const errors = validationResult(req)
        console.log(errors)
        if (!errors.isEmpty()) {
            res.status(200).json({ status: 401, "err": "Something went wrong with input you entered.Please recheck it !" })
            console.log(errors.array())
        }
        else{
        console.log(req.body)
        console.log(req.file)
        let fname = req.body.fname;
        let lname = req.body.lname;
        let email = req.body.email;
        let password = req.body.password;
        let mobile = req.body.mobile;
        let gender = req.body.gender;
        let profile = (req.file) ? req.file.filename : null;
        console.log(profile)
        const passwordHash = await bcrypt.hash(password, 10)
        let ins = new registermodel({ fname: fname, lname: lname, email: email, password: passwordHash, mobile: mobile, gender: gender,profile:profile });
        await ins.save((err) => {
            if (err) {
                res.status(200).json({ status: 401, "err": "Something went wrong.Might be User registered already !" })
            } else {
                res.status(200).json({ status: 200, "msg": "Registered Successfully !!" })
            }

        })
    }
    },

    login: async (req, res) => {
        const errors = validationResult(req)
        console.log(errors)
        if (!errors.isEmpty()) {
            res.status(200).json({ status: 401, "err": "Something went wrong with input you entered.Please recheck it !" })
            console.log(errors.array())
        }
        else{
        console.log(req.body)
        let email = req.body.email;
        let password = req.body.password;
        const user = await registermodel.findOne({ email: email })
        console.log(user)
        const isMatch = await bcrypt.compare(password, user.password)
        console.log(isMatch)

        if (email === user.email && isMatch) {
            let payload = {
                uid: email
            }
            const token = jwt.sign(payload, jwtSecret, { expiresIn: 3600009 })
            res.status(200).json({ err: 0,status: 200, "msg": "Login Successful ! Welcome to BlogSpot", "token": token })
        }
        else if (!email) {
            res.status(200).json({err: 1, status: 401, "msg": 'You must enter an email address.' })
        }
        else if (!password) {
            res.status(200).json({err: 1, status: 401, "msg": 'You must enter a password.' })
        }
        else {
            res.status(200).json({err: 1, status: 401, "msg": "Please Enter valid credential" })
        }
    }
    },
   

    // sociallogin: async (req, res) => {
    //     console.log(req.body)

    //     let name = req.body.name;
    //     let lname = req.body.lname;
    //     let email = req.body.email;
    //     let password = "123456789";

    //     let mobile = req.body.mobile;
    //     let gender = req.body.gender
    //     const passwordHash = await bcrypt.hash(password, 10)
    //     registermodel.findOne({ email: req.body.email }).exec((err, data) => {
    //         if (err) {
    //             res.status(200).json({ status: 400, "msg": "Something Went Wrong" })
    //         }
    //         else if (data == null) {
    //             let ins = new registermodel({ name: name, lname: lname, email: email, password: passwordHash, mobile: "9888776655", gender: "male" });
    //             ins.save((err) => {
    //                 if (err) {
    //                     res.status(200).json({ status: 400, "msg": "Something Went Wrong" })
    //                 }
    //                 else {
    //                     let payload = {
    //                         uid: email
    //                     }
    //                     const token = jwt.sign(payload, jwtSecret, { expiresIn: 3600009 })
    //                     res.status(200).json({ status: 200, "msg": "Login Successfull", "token": token })
    //                     // res.status(200).json({ "msg": "Login Success" })
    //                 }
    //             })
    //         }
    //         else {
    //             res.status(200).json({ status: 200, "msg": "This Is A Email Registered For Login " })
    //         }
    //     })

    // },


    // forgotemail: async (req, res) => {
    //     let data = await registermodel.findOne({ email: req.body.email });
    //     if (data) {
    //         let otpcode = Math.floor((Math.random() * 10000) + 1);
    //         let otpdata = new otpmodel({
    //             email: req.body.email,
    //             code: otpcode,
    //             expiresIn: new Date().getTime() + 300 * 1000

    //         })
    //         otpdata.save((e) => {
    //             if (e) {
    //                 res.status(200).json({ status: 401, "err": 1, "msg": "Something went wrong in adding data" })
    //             }
    //             else {
    //                 res.status(200).json({ status: 200, "err": 0, "msg": "OTP sent to your email. Please check it !" })
    //             }
    //         })
    //         let mailDetails = {
    //             from: 'kameshrane99@gmail.com',
    //             to: 'kameshrane99@gmail.com',
    //             subject: 'Your OTP for password reset',
    //             text: '...',
    //             html: `<!DOCTYPE html>
    //     <html>
    //     <head>
    //     </head>
    //     <body>
    //     <h1>Here is your OTP :${otpdata.code} for Password Reset</h1>
    //     </body>
    //     </html> `
    //         };

    //         mailTransporter.sendMail(mailDetails, function (err, data) {
    //             if (err) {
    //                 console.log('Error Occurs');
    //             } else {
    //                 console.log('Email sent successfully');
    //             }
    //         });
    //     }
    //     else {
    //         res.status(200).json({ status: 401, "err": 1, "msg": "Email id doesn't exist" })
    //     }
    // },

    // changepass: async (req, res) => {
    //     let data = await otpmodel.findOne({ email: req.body.email, code: req.body.code });
    //     if (data) {
    //         let currentTime = new Date().getTime();
    //         let diff = data.expiresIn - currentTime;
    //         if (diff < 0) {
    //             res.json({ "err": 1, "msg": " Token Expires" }).status(400);
    //         }
    //         else {
    //             let user = await registermodel.findOne({ email: req.body.email })
    //             if (user) {

    //                 user.password = req.body.password
    //                 const salt = await bcrypt.genSalt(10);
    //                 let hashpassword = await bcrypt.hash(user.password, salt);
    //                 user.password = hashpassword;
    //                 user.save();
    //                 user.save();
    //                 res.status(200).json({ status: 200, "err": 0, "msg": "Password Changed Successfully !" });
    //             }
    //             else {
    //                 console.log("Something went wrong :(")
    //             }
    //         }
    //     }
    //     else {
    //         res.send("Enter Correct OTP ")
    //     }
    // }
}
module.exports = usercontroller

