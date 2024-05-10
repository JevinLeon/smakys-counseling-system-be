const express = require("express");

const router = express.Router();
const userController = require("../controller/user");

router.route("/").get(userController.getUsers);

module.exports = router;
