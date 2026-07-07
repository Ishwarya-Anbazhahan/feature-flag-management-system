const express = require("express");
const router = express.Router();

const {
  registerOrgAdmin,
  loginOrgAdmin,
  loginEndUser,
  getUsers,
  deleteUser,
} = require("../controllers/userController");

const verifyToken = require("../middleware/authMiddleware");

// Organization Admin Login (Public)
router.post("/login", loginOrgAdmin);

// Register Organization Admin (Protected)
router.post("/register", verifyToken, registerOrgAdmin);

// Get All Users (Protected)
router.get("/", verifyToken, getUsers);

// Delete User (Protected)
router.delete("/:id", verifyToken, deleteUser);

// End User Login (Public)
router.post("/end-user/login", loginEndUser);

module.exports = router;