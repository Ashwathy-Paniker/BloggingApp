const router = require('express').Router()
const blogcontroller = require('../controller/blogcontroller')
const jwt = require('jsonwebtoken');
const jwtSecret = "wewr32vsdfgswfwr2343ert";
const express = require('express');

const multer = require('multer')
const path = require('path')

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(express.static(path.join(__dirname, "./public/")))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // cb(null, "E:/privateblogging/public/images");
        // cb(null, "C:/Training/reactjs/node_js/BloggingApp/frontend/public/images");
        cb(null, "C:/Training/reactjs/node_js/Major_Project/BloggingApp/frontend/public/images");

    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    },
});
let upload = multer({
    storage: storage,
}).single('myImage')


router.post("/addblog", upload, blogcontroller.addblog)
router.get('/getblog/:email',autenticateToken, blogcontroller.usersblog)
router.get('/getallblog', blogcontroller.usersallblog)
router.post('/editblog/:id', blogcontroller.editblog)
router.post('/blog/search', blogcontroller.searchByQueryType);
router.get("/singleblog/:id", blogcontroller.singleblog)

function autenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token)
    if (token == null) {
        res.json({ "err": "Token not match" })
    }
    else {
        jwt.verify(token, jwtSecret, (err, data) => {
            if (err) {
                res.json({ "err": "Token incorrect" })
            }
            else {
                res.json({ "msg": " Token Matched" })
                next();
            }
        })
    }
}

router.get('/loginfirst', autenticateToken, (req, res) => {
    res.json({ "msg": "Token correct " })

})


module.exports = router