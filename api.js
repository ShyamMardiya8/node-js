const express = require("express")
const users = require("./MOCK_DATA.json")
const fs = require("fs")
const { json } = require("stream/consumers")
const mongoose = require("mongoose")
const { timeStamp } = require("console")
const app = express() 
const userRouter = require("./Routes/user")
const port = 9000

// my mongoose schema




// connection

mongoose.connect('mongodb://127.0.0.1:27017/shyam1')
.then(() => console.log("mongodb connected"))
.catch((err) => console.log(err.message))

app.use(express.json())
app.use(express.urlencoded({ extended : false}))
app.use((req, res, next) => {
    fs.appendFile('./log.txt', `\ntime is $${Date.now()} path name is ${req.path} request method is ${req.method}`, (err, result) => console.log(err))
    next()
    // return res.json({ message : "sorry!"})
})
app.use((req, res, next) => {
    // return res.end("sorry")
    next()
})

app.user('/user', userRouter)

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})

