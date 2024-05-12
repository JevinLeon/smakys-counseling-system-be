const express = require("express");
const authController = require("../controller/auth");
const { authMiddleware } = require("../middlewares/auth");

const router = express.Router();

router.post("/login", authController.login);
router.get(
  "/profile",
  authMiddleware(["admin", "superadmin"]),
  authController.profile
);

module.exports = router;
