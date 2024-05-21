const express = require("express");

const router = express.Router();
const counselingLogController = require("../controller/counseling-log");
const { authMiddleware } = require("../middlewares/auth");

router
  .route("/")
  .get(
    authMiddleware(["admin", "superadmin"]),
    counselingLogController.getCounselingLogs
  )
  .post(
    authMiddleware(["admin", "superadmin"]),
    counselingLogController.addCounselingLog
  );

module.exports = router;
