const fs = require("fs")
const os = require("os")
console.log(os)
// fs.writeFileSync("./demo.txt", "hello world", ((err, result) => console.log(result)))

console.log("1")
fs.readFile("./demo.txt", "utf-8", ((err, result) => console.log(result)))
console.log("2")