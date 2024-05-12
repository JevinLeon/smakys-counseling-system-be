const express = require("express");

const router = express.Router();
const userRoutes = require("./user");
const classRoutes = require("./class");
const studentRoutes = require("./student");
const counselingRoutes = require("./counseling");
const authRoutes = require("./auth");

router.use("/users", userRoutes);
router.use("/classes", classRoutes);
router.use("/students", studentRoutes);
router.use("/counselings", counselingRoutes);
router.use("/auth", authRoutes);

module.exports = router;
