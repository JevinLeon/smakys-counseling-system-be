const express = require("express");

const router = express.Router();
const studentController = require("../controller/student");
const { authMiddleware } = require("../middlewares/auth");

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
