const express = require("express");
// const { body } = require("express-validator");

const feedController = require("../controllers/feed");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.get("/", isAuth, feedController.getPosts);

router.get("/post/:postId", isAuth, feedController.getPost);

router.post("/post", isAuth, feedController.createPost);

router.put("/post", isAuth, feedController.updatePost);

router.delete("/post/:postId", isAuth, feedController.deletePost);

module.exports = router;
