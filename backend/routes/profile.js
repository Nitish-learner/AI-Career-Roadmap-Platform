const express = require("express");
const router = express.Router();

const db = require("../db");

// Save selected career
router.post("/career", (req, res) => {

    const { userId, careerGoal } = req.body;

    if (!userId || !careerGoal) {
        return res.status(400).json({
            message: "User ID and career goal are required"
        });
    }

    const sql = `
        UPDATE users
        SET career_goal = ?
        WHERE id = ?
    `;

    db.query(sql, [careerGoal, userId], (err, result) => {

        if (err) {
            console.error("❌ Career save error:", err);

            return res.status(500).json({
                message: "Failed to save career"
            });
        }

        res.json({
            message: "Career saved successfully",
            careerGoal: careerGoal
        });

    });

});

module.exports = router;