const express = require("express");

const router = express.Router();
const userController = require("../controller/user");
const { authMiddleware } = require("../middlewares/auth");

router
  .route("/")
  .get(authMiddleware(["superadmin"]), userController.getUsers)
  .post(authMiddleware(["superadmin"]), userController.addUser);

router
  .route("/:id")
  .get(authMiddleware(["superadmin"]), userController.getUserById)
  .put(authMiddleware(["superadmin"]), userController.updateUser)
  .delete(authMiddleware(["superadmin"]), userController.deleteUser);

module.exports = router;
