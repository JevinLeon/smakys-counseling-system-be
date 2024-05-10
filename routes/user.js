const express = require("express");

const router = express.Router();
const userController = require("../controller/user");

router.route("/").get(userController.getUsers).post(userController.addUser);

router
  .route("/:id")
  .get(userController.getUserById)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
