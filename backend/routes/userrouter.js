const router = require('express').Router()
const usercontroller = require('../controller/usercontroller')
const jwt = require('jsonwebtoken');
const jwtSecret = "wewr32vsdfgswfwr2343ert";

const express = require('express');
const multer = require('multer')
const path = require('path')
const { check, validationResult } = require('express-validator');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(express.static(path.join(__dirname, "./public/")))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "C:/Training/reactjs/node_js/BloggingApp/frontend/public/images");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    },
});
let upload = multer({storage: storage,}).single('profile')

router.post('/adduser',upload,
   [check('fname').isLength({ min: 4 }).isAlpha().withMessage('Character only accepted '),
    check('lname').isLength({ min: 4 }).isAlpha().withMessage('Character only accepted'),
    check('email').isEmail().withMessage('Enter Valid Email'),
    check('password').notEmpty().withMessage('Enter Valid password'),
    check('mobile').isNumeric().withMessage('Enter valid mobile no'),
], usercontroller.register)

// router.post('/adduser',upload, usercontroller.register)

router.post('/login',
[check('email').isEmail().withMessage('Enter Valid Email'),
check('password').notEmpty().withMessage('Enter Valid password'),
] ,usercontroller.login)



module.exports = router