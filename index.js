const http = require("http")
const fs = require("fs")

const server = http.createServer((req, res) => {
    const log = `received data from client ${Date.now()} and url is ${req.url}\n`
    fs.appendFile("./demo.txt",log, ((err, result) => {
       switch(req.url) {
       case "/" :  res.end("home Page")
       break;
       case "/about" : res.end("my name is shyam")
       break;
       default :
       res.end("404")
    }
    }))
})

server.listen(3000, () => {
    console.log(`server is ready http://localhost:3000`)
})