const express = require("express");

const router = express.Router();
const counselingController = require("../controller/counseling");
const { authMiddleware } = require("../middlewares/auth");

router
  .route("/")
  .get(
    authMiddleware(["admin", "superadmin"]),
    counselingController.getCounselings
  )
  .post(
    authMiddleware(["admin", "superadmin"]),
    counselingController.addCounseling
  );

router
  .route("/:id")
  .get(
    authMiddleware(["admin", "superadmin"]),
    counselingController.getCounselingById
  )
  .put(
    authMiddleware(["admin", "superadmin"]),
    counselingController.updateCounseling
  )
  .delete(
    authMiddleware(["admin", "superadmin"]),
    counselingController.deleteCounseling
  );

module.exports = router;
