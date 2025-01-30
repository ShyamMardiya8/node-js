const express = require("express")
const http = require("http")

const app = express()


app.get('/', (req, res) => {
    return res.send("Hello Home Page")
})

app.get('/About', (req, res) => {
    return res.send("Hello About Page" + " Hey " +  req.query.myname + " you are " + req.query.age)
})


const server = http.createServer(app)

server.listen(3000, () => {
    console.log(`http://localhost:3000`)
}) 

