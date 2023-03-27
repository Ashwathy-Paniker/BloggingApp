const express = require('express')
const cors = require('cors')
const PORT = 9000;
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

const userrouter = require('./routes/userrouter')
app.use('/api/', userrouter)

const blogrouter = require('./routes/blogrouter')
app.use('/api/', blogrouter)

const connectDB = require('./config/dbconnect')
connectDB()
app.listen(PORT, (err) => {
    if (err) throw err;
    else {
        console.log("Server runs on " + PORT)
    }
})
