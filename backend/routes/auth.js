const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../db");

const router = express.Router();


// ===============================
// REGISTER
// ===============================

router.post("/register", async (req, res) => {

    const {
        name,
        email,
        password,
        college,
        course,
        year
    } = req.body;

    // Check required fields
    if (!name || !email || !password || !college || !course || !year) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    try {

        // Check if email already exists
        const checkSql = "SELECT id FROM users WHERE email = ?";

        db.query(checkSql, [email], async (err, results) => {

            if (err) {
                console.error(err);

                return res.status(500).json({
                    message: "Database error"
                });
            }

            if (results.length > 0) {
                return res.status(409).json({
                    message: "Email already registered"
                });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert user
            const insertUserSql =
                "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

            db.query(
                insertUserSql,
                [name, email, hashedPassword],
                (err, result) => {

                    if (err) {
                        console.error(err);

                        return res.status(500).json({
                            message: "Failed to register user"
                        });
                    }

                    const userId = result.insertId;

                    // Insert profile
                    const profileSql = `
                        INSERT INTO user_profiles
                        (user_id, college, course, year)
                        VALUES (?, ?, ?, ?)
                    `;

                    db.query(
                        profileSql,
                        [userId, college, course, year],
                        (err) => {

                            if (err) {
                                console.error(err);

                                return res.status(500).json({
                                    message: "User created but profile save failed"
                                });
                            }

                            res.status(201).json({
                                message: "Registration successful",
                                userId: userId
                            });
                        }
                    );
                }
            );
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
});


// ===============================
// LOGIN
// ===============================

router.post("/login", (req, res) => {

    const { email, password } = req.body;

    // Check empty fields
    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }

    // Find user
    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], async (err, results) => {

        if (err) {
            console.error(err);

            return res.status(500).json({
                message: "Database error"
            });
        }

        // User not found
        if (results.length === 0) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const user = results[0];

        // Compare password
        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Login successful
        res.status(200).json({
            message: "Login successful",

            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    });
});

// ===============================
// GET USER PROFILE
// ===============================

router.get("/profile/:id", (req, res) => {

    const userId = req.params.id;

    const sql = `
        SELECT
    users.id,
    users.name,
    users.email,
    users.career_goal,
    user_profiles.college,
    user_profiles.course,
    user_profiles.year
        FROM users
        LEFT JOIN user_profiles
            ON users.id = user_profiles.user_id
        WHERE users.id = ?
    `;

    db.query(sql, [userId], (err, results) => {

        if (err) {
            console.error("Profile Error:", err);

            return res.status(500).json({
                message: "Database error"
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "Profile fetched successfully",
            user: results[0]
        });
    });
});

module.exports = router;