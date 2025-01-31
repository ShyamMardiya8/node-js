const fs = require("fs")


// how to read file usinf fs in node js it will be two types of read file method first is readfileSync for sync program and second is readFile for async operation


const read = fs.readFileSync("./index.js", "utf-8")
console.log(read)

fs.readFile("./index.js", "utf-8", (err, result) => {
    if (err) {
        console.log(err)
    }
    else{
        console.log(result)
    }
})


// how to create file using node js in fs using it will work using writeSync for sync filling and second is write for async operation

// fs.writeFile("./demo.text", "welcome demo", (err, result) => console.log(result))

// fs.writeFileSync("./demo2.text", "hello demo2")


// for entering data in file appendFileSync for sync operation

// fs.appendFile("./demo.txt", `data is Log in ${Date.now()}\n`, ((err,result) => console.log(result)))

// const state = fs.statSync("./demo.txt")
// console.log(state)


// fs.mkdirSync("my-docs/a/b", {recursive : true})

// fs.unlinkSync("./demo.txt")