const express = require("express");
const router = express.Router();

const {
    createFeatureFlag,
    getFeatureFlags,
    toggleFeatureFlag,
    deleteFeatureFlag,
} = require("../controllers/featureFlagController");

const verifyToken = require("../middleware/authMiddleware");

// Get All Feature Flags
router.get("/", verifyToken, getFeatureFlags);

// Create Feature Flag
router.post("/", verifyToken, createFeatureFlag);

// Update Feature Flag
router.put("/:id", verifyToken, toggleFeatureFlag);

// Delete Feature Flag
router.delete("/:id", verifyToken, deleteFeatureFlag);

module.exports = router;