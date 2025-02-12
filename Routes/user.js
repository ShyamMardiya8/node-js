const express = require("express");
const router = express.Router();
const User = require("../Models/User"); // Correctly importing the model

// Get HTML List of Users
router.get("/html", async (req, res) => {
  try {
    const usersData = await User.find({});
    const html = `
      <ul>${usersData.map((i) => `<li>${i.first_name}</li>`).join("")}</ul>
    `;
    return res.send(html);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Error retrieving users" });
  }
});

// Get JSON List of Users
router.get("/", async (req, res) => {
  try {
    const usersData = await User.find({});
    return res.json(usersData);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Error retrieving users" });
  }
});

// Get User by ID
router.route("/:id").get(async (req, res) => {
  try {
    const userData = await User.findById(req.params.id);
    if (!userData) {
      return res.status(404).json({ msg: "User not found" });
    }
    return res.json(userData);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Error fetching user" });
  }
});

// Create a new User
router.post("/", async (req, res) => {
  const { first_name, last_name, email, job_title, gender } = req.body;
  if (!first_name || !last_name || !email || !job_title || !gender) {
    return res.status(400).json({ msg: "Please fill all fields" });
  }

  try {
    const newUser = await User.create({ first_name, last_name, email, job_title, gender });
    return res.status(201).json({ msg: "User created successfully", user: newUser });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Error creating user", error: err.message });
  }
});

// Update User by ID
router.put("/:id", async (req, res) => {
  const newUserData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    job_title: req.body.job_title,
    gender: req.body.gender,
  };

  try {
    const userData = await User.findByIdAndUpdate(req.params.id, newUserData, { new: true });
    if (!userData) {
      return res.status(404).json({ msg: "User not found" });
    }
    return res.json({ msg: "User updated successfully", user: userData });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Error updating user", error: err.message });
  }
});

// Delete User by ID
router.delete("/:id", async (req, res) => {
  try {
    const userData = await User.findByIdAndDelete(req.params.id);
    if (!userData) {
      return res.status(404).json({ msg: "User not found" });
    }
    return res.status(200).json({ msg: "User deleted successfully" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Error deleting user", error: err.message });
  }
});

module.exports = router;
