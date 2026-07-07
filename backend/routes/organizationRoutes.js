const express = require("express");
const router = express.Router();

const {
  createOrganization,
  getOrganizations,
  updateOrganization,
  deleteOrganization,
} = require("../controllers/organizationController");

const verifyToken = require("../middleware/authMiddleware");

router.post("/", verifyToken, createOrganization);

router.get("/", verifyToken, getOrganizations);

router.put("/:id", verifyToken, updateOrganization);

router.delete("/:id", verifyToken, deleteOrganization);

module.exports = router;