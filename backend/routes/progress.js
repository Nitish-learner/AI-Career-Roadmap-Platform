const express = require("express");
const db = require("../db");

const router = express.Router();


// ===============================
// COMPLETE LESSON
// ===============================

router.post("/complete", (req, res) => {

    const {
        user_id,
        domain,
        lesson_id,
        score
    } = req.body;

    // Check required fields
    if (!user_id || !domain || !lesson_id) {
        return res.status(400).json({
            message: "user_id, domain and lesson_id are required"
        });
    }

    const sql = `
        INSERT INTO lesson_progress
        (user_id, domain, lesson_id, completed, score)
        VALUES (?, ?, ?, TRUE, ?)

        ON DUPLICATE KEY UPDATE
        completed = TRUE,
        score = VALUES(score),
        completed_at = CURRENT_TIMESTAMP
    `;

    db.query(
        sql,
        [
            user_id,
            domain,
            lesson_id,
            score || 0
        ],
        (err, result) => {

            if (err) {
                console.error("Progress save error:", err);

                return res.status(500).json({
                    message: "Failed to save progress"
                });
            }

            res.status(200).json({
                message: "Lesson progress saved successfully"
            });
        }
    );
});


// ===============================
// GET USER PROGRESS
// ===============================

router.get("/:userId", (req, res) => {

    const userId = req.params.userId;

    const sql = `
        SELECT
            domain,
            lesson_id,
            completed,
            score,
            completed_at
        FROM lesson_progress
        WHERE user_id = ?
        ORDER BY completed_at DESC
    `;

    db.query(
        sql,
        [userId],
        (err, results) => {

            if (err) {
                console.error("Progress fetch error:", err);

                return res.status(500).json({
                    message: "Failed to fetch progress"
                });
            }

            res.status(200).json({
                message: "Progress fetched successfully",
                progress: results
            });
        }
    );
});


module.exports = router;