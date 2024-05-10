const express = require("express");

const router = express.Router();
const userRoutes = require("./user");
const classRoutes = require("./class");

router.use("/users", userRoutes);
router.use("/classes", classRoutes);

module.exports = router;
