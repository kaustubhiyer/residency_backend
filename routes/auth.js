const express = require("express");
// const { body } = require("express-validator");

const authController = require("../controllers/auth");

const router = express.Router();

router.get("/profile", authController.profile);

router.put("/signup", authController.signup);

router.post("/login", authController.login);

router.put("/update-user", authController.updateUser);

module.exports = router;
