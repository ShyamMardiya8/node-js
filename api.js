const express = require("express")
const users = require("./MOCK_DATA.json")
const fs = require("fs")
const { json } = require("stream/consumers")
const app = express()
const port = 3000
app.use(express.json())
app.use(express.urlencoded({ extended : false}))

app.get("/user", (req, res) => {
    const html =
        `
    <ul>${users.map((i) => (

            `<li>${i.first_name}</li>`

        )).join("")} </ul>`
    return res.send(html)
})

app.get('/api/user', (req, res) => {
    return res.json(users)
})

// app.get('/api/user/:id', (req, res) => {
//     const id = Number(req.params.id)
//     const user = users.find((i) => i.id === id)
//     return res.json(user)
// })


// short hand method how it is works


app.route("/api/user/:id")
.get((req, res) => {
    const id = Number(req.params.id)
    const user = users.find((i) => i.id === id)
    return res.json(user)
})


app.post("/api/user", (req, res) => {
    const body = req.body
    users.push({...body, id : users.length + 1})
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), ((err, result) => {
        res.json({status: "pending"})
    }) )
   
})

app.put("/api/user/:id", (req, res) => {
    const id = Number(req.params.id)
    console.log("data get from body", newUserData)
    const editUser = users.map((i) => i.id === id ? {...i, ...newUserData} : i)
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(editUser), ((err, result) => {
        return res.send({status : "success"})
    }))
})

app.delete("/api/user/:id", (req, res) => {
   const id = Number(req.params.id)
   const deletedUser = users.filter((i) => i.id !== id)
   fs.writeFile("./MOCK_DATA.json", JSON.stringify(deletedUser), ((err, result) => {
    if(err){
        return res.send({status : "failed "})
    }
    else{
        return res.send({status : "success"})
    }
   }))
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})