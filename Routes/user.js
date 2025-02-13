const express = require("express");
const router = express.Router();
const User = require("../Models/User"); // Correctly importing the model
const {getAllUser, getAllUserById, PostData, updateUserById, deleteUserById} = require("../Controller/users")

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

router.get("/", getAllUser).post("/",PostData);

router.route("/:id")
.get(getAllUserById)
.put(updateUserById)
.delete(deleteUserById)


module.exports = router;
