const express = require("express");
// const { body } = require("express-validator");

const feedController = require("../controllers/feed");

const router = express.Router();

router.get("/", feedController.getPosts);

router.get("/post/:postId", feedController.getPost);

router.post("/post", feedController.createPost);

router.put("/post", feedController.updatePost);

router.delete("/post/:postId", feedController.deletePost);

module.exports = router;
