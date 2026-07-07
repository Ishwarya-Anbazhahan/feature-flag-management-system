const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register Organization Admin
const registerOrgAdmin = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      organization_id,
      role,
    } = req.body;

    if (!name || !email || !password || !organization_id) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const checkSql = "SELECT * FROM users WHERE email = ?";

    db.query(checkSql, [email], async (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          error: err.message,
        });
      }

      if (result.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Email already exists",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const insertSql =
        "INSERT INTO users(name, email, password, role, organization_id) VALUES (?, ?, ?, ?, ?)";

      db.query(
        insertSql,
        [
          name,
          email,
          hashedPassword,
          role || "ORG_ADMIN",
          organization_id,
        ],
        (err) => {
          if (err) {
            return res.status(500).json({
              success: false,
              error: err.message,
            });
          }

          res.status(201).json({
            success: true,
            message: "User Registered Successfully",
          });
        }
      );
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// Organization Admin Login
const loginOrgAdmin = (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], async (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }

    if (result.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    const user = result[0];

    console.log("User Email:", user.email);
    console.log("Entered Password:", password);
    console.log("DB Password:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);

    console.log("Password Match:", isMatch);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        organization_id: user.organization_id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.json({
      success: true,
      message: "Login Successful",
      token,
    });
  });
};

// End User Login
const loginEndUser = (req, res) => {
  const { email, password } = req.body;

  const sql =
    "SELECT * FROM users WHERE email=? AND role='END_USER'";

  db.query(sql, [email], async (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }

    if (result.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const user = result[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        organization_id: user.organization_id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      success: true,
      token,
    });
  });
};

// Get All Organization Admins
const getUsers = (req, res) => {
  const sql = `
    SELECT users.id, users.name, users.email,
           organizations.name AS organization
    FROM users
    LEFT JOIN organizations
      ON users.organization_id = organizations.id
   WHERE users.role IN ('ORG_ADMIN','END_USER')
    ORDER BY users.id DESC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }

    res.json({
      success: true,
      users: result,
    });
  });
};

// Delete User
const deleteUser = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM users WHERE id=?", [id], (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }

    res.json({
      success: true,
      message: "User Deleted Successfully",
    });
  });
};


module.exports = {
  registerOrgAdmin,
  loginOrgAdmin,
  loginEndUser,
  getUsers,
  deleteUser,

};