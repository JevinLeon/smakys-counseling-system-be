const multer = require("multer");
const express = require("express");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

const router = express.Router();
const studentController = require("../controller/student");
const { authMiddleware } = require("../middlewares/auth");

router.get("/export-excel", studentController.exportExcel);
router.post(
  "/excel",
  authMiddleware(["admin", "superadmin"]),
  upload.single("file"),
  studentController.addStudentsWithExcel
);

router
  .route("/")
  .get(authMiddleware(["admin", "superadmin"]), studentController.getStudents)
  .post(authMiddleware(["admin", "superadmin"]), studentController.addStudent);

router
  .route("/:id")
  .get(
    authMiddleware(["admin", "superadmin"]),
    studentController.getStudentById
  )
  .put(authMiddleware(["admin", "superadmin"]), studentController.updateStudent)
  .delete(
    authMiddleware(["admin", "superadmin"]),
    studentController.deleteStudent
  );

module.exports = router;
