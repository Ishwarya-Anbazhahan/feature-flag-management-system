const db = require("../config/db");

// Create Feature Flag
const createFeatureFlag = (req, res) => {
    const { feature_key, is_enabled } = req.body;

    // Temporary organization id
    const organization_id = 3;

    if (!feature_key) {
        return res.status(400).json({
            success: false,
            message: "Feature Key is required",
        });
    }

    const sql = `
    INSERT INTO feature_flags
    (feature_key, organization_id, is_enabled)
    VALUES (?, ?, ?)
  `;

    db.query(
        sql,
        [feature_key, organization_id, is_enabled],
        (err) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    error: err.message,
                });
            }

            res.status(201).json({
                success: true,
                message: "Feature Flag Created Successfully",
            });
        }
    );
};

// Get All Feature Flags
const getFeatureFlags = (req, res) => {
    db.query(
        "SELECT * FROM feature_flags ORDER BY id DESC",
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    error: err.message,
                });
            }

            res.json({
                success: true,
                featureFlags: result,
            });
        }
    );
};

// Toggle Feature Flag
const toggleFeatureFlag = (req, res) => {
    const { id } = req.params;
    const { is_enabled } = req.body;

    db.query(
        "UPDATE feature_flags SET is_enabled=? WHERE id=?",
        [is_enabled, id],
        (err) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    error: err.message,
                });
            }

            res.json({
                success: true,
                message: "Feature Updated",
            });
        }
    );
};

// Delete Feature Flag
const deleteFeatureFlag = (req, res) => {
    const { id } = req.params;

    db.query(
        "DELETE FROM feature_flags WHERE id=?",
        [id],
        (err) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    error: err.message,
                });
            }

            res.json({
                success: true,
                message: "Feature Deleted",
            });
        }
    );
};

module.exports = {
    createFeatureFlag,
    getFeatureFlags,
    toggleFeatureFlag,
    deleteFeatureFlag,
};