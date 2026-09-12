const express = require("express");
const router = express.Router();
const db = require("../db");

// Get all applications of a user
router.get("/:userId", (req, res) => {
    const userId = req.params.userId;

    const sql = `
        SELECT *
        FROM applications
        WHERE user_id = ?
        ORDER BY applied_date DESC, id DESC
    `;

    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error("Error fetching applications:", err);
            return res.status(500).json({
                message: "Failed to fetch applications"
            });
        }

        res.json(results);
    });
});

// Add new application
router.post("/", (req, res) => {
    const {
        user_id,
        company_name,
        job_role,
        job_link,
        applied_date,
        status,
        notes
    } = req.body;

    if (!user_id || !company_name || !job_role) {
        return res.status(400).json({
            message: "User ID, company name and job role are required"
        });
    }

    const sql = `
        INSERT INTO applications
        (user_id, company_name, job_role, job_link, applied_date, status, notes)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        user_id,
        company_name,
        job_role,
        job_link || null,
        applied_date || null,
        status || "Applied",
        notes || null
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error adding application:", err);
            return res.status(500).json({
                message: "Failed to add application"
            });
        }

        res.status(201).json({
            message: "Application added successfully",
            applicationId: result.insertId
        });
    });
});

// Update application
router.put("/:id", (req, res) => {
    const applicationId = req.params.id;

    const {
        company_name,
        job_role,
        job_link,
        applied_date,
        status,
        notes
    } = req.body;

    const sql = `
        UPDATE applications
        SET company_name = ?,
            job_role = ?,
            job_link = ?,
            applied_date = ?,
            status = ?,
            notes = ?
        WHERE id = ?
    `;

    const values = [
        company_name,
        job_role,
        job_link || null,
        applied_date || null,
        status || "Applied",
        notes || null,
        applicationId
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error updating application:", err);
            return res.status(500).json({
                message: "Failed to update application"
            });
        }

        res.json({
            message: "Application updated successfully"
        });
    });
});

// Delete application
router.delete("/:id", (req, res) => {
    const applicationId = req.params.id;

    const sql = "DELETE FROM applications WHERE id = ?";

    db.query(sql, [applicationId], (err, result) => {
        if (err) {
            console.error("Error deleting application:", err);
            return res.status(500).json({
                message: "Failed to delete application"
            });
        }

        res.json({
            message: "Application deleted successfully"
        });
    });
});

module.exports = router;