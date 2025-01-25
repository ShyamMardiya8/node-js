var http = require("http")



const server = http.createServer((req, res) => {
    res.write("hello node js enviourment")
    res.end()
})

server.listen(3100, () => {
    console.log('Server running in http://localhost:3100')
})