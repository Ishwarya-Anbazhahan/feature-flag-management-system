const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  router.post("/login", (req, res) => {
  console.log("Login API called");
  console.log(req.body);

  const { username, password } = req.body;
});

  if (username === "admin" && password === "admin123") {

    const token = jwt.sign(
      {
        username: "admin",
        role: "SUPER_ADMIN"
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h"
      }
    );

    return res.json({
      success: true,
      message: "Super Admin Login Successful",
      token: token
    });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid Credentials"
  });
});

module.exports = router;
