const mongoose = require("mongoose");

function connectMongoDb(url) {
  return mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => {
      console.error("Failed to connect to MongoDB:", err.message);
      process.exit(1); // Exit the process if the connection fails
    });
}

module.exports = { connectMongoDb };
