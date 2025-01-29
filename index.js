const http = require("http")
const fs = require("fs")
const url = require("url")

const server = http.createServer((req, res) => {
    if (req.url === '/favicon.ico') return res.end()
    const log = `received data from client ${Date.now()} and url is ${req.url}\n`
    const myUrl = url.parse(req.url, true)
    console.log(myUrl)
    fs.appendFile("./demo.txt", log, ((err, result) => {
        switch (myUrl.pathname) {
            case "/":
                res.end(`home`)
                break;
            case "/about":
                const userName = myUrl.query.myname
                res.end(`my name is ${userName}`)
                break;
            default:
                res.end("404")
        }
    }))
})

server.listen(3000, () => {
    console.log(`server is ready http://localhost:3000`)
})