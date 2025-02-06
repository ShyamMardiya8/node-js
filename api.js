const express = require("express")
const users = require("./MOCK_DATA.json")
const fs = require("fs")
const { json } = require("stream/consumers")
const mongoose = require("mongoose")
const { timeStamp } = require("console")
const app = express() 
const port = 3000

// my mongoose schema


const userSchema = new mongoose.Schema({
    first_name : {
        type : String,
        required : true,
    },
    last_name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    job_title : {
        type : String,
    },
    gender : {
        type : String
    }
}, {timestamps : true})

const User = mongoose.model('user', userSchema)


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

app.get("/user", async (req, res) => {
    const usersData = await User.find({});
    const html =
        `
    <ul>${usersData.map((i) => (

            `<li>${i.first_name}</li>`

        )).join("")} </ul>`
    return res.send(html)
})

app.get('/api/user',async (req, res) => {
  const userData = await User.find({});
    return res.json(userData)
})

// app.get('/api/user/:id', (req, res) => {
//     const id = Number(req.params.id)
//     const user = users.find((i) => i.id === id)
//     return res.json(user)
// })


// short hand method how it is works


app.route("/api/user/:id")
.get(async (req, res) => {
  const userData = await User.findById(req.params.id);

    // const id = Number(req.params.id)    
    // const user = users.find((i) => i.id === id)
    if (!userData) {
        res.status(404).json({msg : "user is not existed"})
    }
    return res.status(200).json(user)
})

app.post("/api/user", async (req, res) => {
    const body = req.body;
    if (!body.first_name || !body.last_name || !body.email || !body.job_title || !body.gender) {
        return res.status(400).json({ msg: "please fill all fields" });
    }

    try {
        const result = await User.create({
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
            job_title: body.job_title,
            gender: body.gender
        });

        console.log(result);
        return res.status(201).json({ status: "user is created" });
    } catch (err) {
        console.log(err.message); // Log error for debugging
        return res.status(500).json({ msg: "Error creating user", error: err.message });
    }
});


app.put("/api/user/:id", async (req, res) => {
    // const id = Number(req.params.id)
    // console.log("data get from body", newUserData)
    // const editUser = users.map((i) => i.id === id ? {...i, ...newUserData} : i)
    // fs.writeFile("./MOCK_DATA.json", JSON.stringify(editUser), ((err, result) => {
    //     return res.send({status : "success"})
    // }))
    const newUserData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        job_title: req.body.job_title,
        gender: req.body.gender
      };
        try{
            const userData = await User.findByIdAndUpdate(req.params.id, newUserData, {
                new: true,
              });
              if (!userData) {
                return res.status(404).json({ message: "failure" });
              }
              return res.json({ message: "successfully Updated" });
        }
        catch(err){
            console.log(err.message)
        }
})

app.delete("/api/user/:id", async (req, res) => {
//    const id = Number(req.params.id)
//    const deletedUser = users.filter((i) => i.id !== id)
//    fs.writeFile("./MOCK_DATA.json", JSON.stringify(deletedUser), ((err, result) => {
//     if(err){
//         return res.send({status : "failed "})
//     }
//     else{
//         return res.send({status : "success"})
//     }
//    }))
try{
    const userData = await User.findByIdAndDelete(req.params.id)
    if (!userData) {
         res.status(404).json({message : "id is required to delete"})
      }
      res.status(200).json({message : "successfully delete"})
}
catch(err){
    console.log(err.message)
}
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})

