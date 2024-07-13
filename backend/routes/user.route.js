const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/auth.middleware");
const {
  validateRegistration,
  validateUpdation,
} = require("../middlewares/validate.middleware");

//impoting controller:
const userCallController = require("../controllers/user.controller");

router.post(
  "/registration",
  validateRegistration,
  userCallController.registration
);
router.post("/login", userCallController.login);
router.get("/all-users", authenticate, userCallController.getAllUsers);
router.put(
  "/update/:id",
  authenticate,
  validateUpdation,
  userCallController.updateUser
);
router.delete("/delete-user/:id", authenticate, userCallController.deleteUser);

module.exports = router;
