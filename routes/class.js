const express = require("express");

const router = express.Router();
const classController = require("../controller/class");

router
  .route("/")
  .get(classController.getClasses)
  .post(classController.addClass);

router
  .route("/:id")
  .get(classController.getClassById)
  .put(classController.updateClass)
  .delete(classController.deleteClass);

module.exports = router;
