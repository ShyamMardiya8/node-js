const fs = require("fs")

function logReqRes(fileName){
    return (req, res, next) => {
        fs.appendFile(fileName, `\ntime is $${Date.now()} path name is ${req.path} request method is ${req.method}`, (err, result) => console.log(err))
        next()
    }
}

module.exports ={
    logReqRes
}