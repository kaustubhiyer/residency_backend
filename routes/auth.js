const express = require("express");
// const { body } = require("express-validator");

const authController = require("../controllers/auth");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.get("/profile", isAuth, authController.profile);

router.put("/signup", authController.signup);

router.post("/login", authController.login);

router.put("/update-user", isAuth, authController.updateUser);

module.exports = router;
