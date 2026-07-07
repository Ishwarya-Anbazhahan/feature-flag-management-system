const db = require("../config/db");

// Create Organization
const createOrganization = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Organization name is required",
    });
  }

  const checkSql = "SELECT * FROM organizations WHERE name = ?";

  db.query(checkSql, [name], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }

    if (result.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Organization already exists",
      });
    }

    const insertSql = "INSERT INTO organizations(name) VALUES(?)";

    db.query(insertSql, [name], (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          error: err.message,
        });
      }

      res.status(201).json({
        success: true,
        message: "Organization Created Successfully",
      });
    });
  });
};

// Get All Organizations
const getOrganizations = (req, res) => {
  const sql = "SELECT * FROM organizations ORDER BY id DESC";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }

    res.json({
      success: true,
      organizations: result,
    });
  });
};

// Update Organization
const updateOrganization = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const sql = "UPDATE organizations SET name = ? WHERE id = ?";

  db.query(sql, [name, id], (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }

    res.json({
      success: true,
      message: "Organization Updated Successfully",
    });
  });
};

// Delete Organization
const deleteOrganization = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM organizations WHERE id = ?";

  db.query(sql, [id], (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }

    res.json({
      success: true,
      message: "Organization Deleted Successfully",
    });
  });
};

module.exports = {
  createOrganization,
  getOrganizations,
  updateOrganization,
  deleteOrganization,
};

