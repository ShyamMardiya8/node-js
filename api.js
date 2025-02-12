const express = require("express");
const { connectMongoDb } = require("./connection");
const userRouter = require("./Routes/user");
const { logReqRes } = require("./middleware/index");
const mongoose = require("mongoose");

const app = express();
const port = 9000;

// Database connection
connectMongoDb("mongodb://127.0.0.1:27017/shyam1")

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));  // Log requests and responses

// API Routes
app.use("/user", userRouter);

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
