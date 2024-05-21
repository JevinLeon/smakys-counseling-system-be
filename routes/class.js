const multer = require("multer");
const express = require("express");

const router = express.Router();
const classController = require("../controller/class");
const { authMiddleware } = require("../middlewares/auth");

router.get("/export-excel", classController.exportExcel);

router
  .route("/")
  .get(authMiddleware(["admin", "superadmin"]), classController.getClasses)
  .post(authMiddleware(["admin", "superadmin"]), classController.addClass);

router
  .route("/:id")
  .get(authMiddleware(["admin", "superadmin"]), classController.getClassById)
  .put(authMiddleware(["admin", "superadmin"]), classController.updateClass)
  .delete(authMiddleware(["admin", "superadmin"]), classController.deleteClass);

module.exports = router;
