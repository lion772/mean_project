const express = require("express");
const router = express.Router();
const Post = require("../model");

router.post("/post", function (req, res) {
  console.log("body is ", req.body);
  let newPost = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  newPost.save().then((post) => {
    res.status(201).json({ msg: "Data stored successfully!", post: post });
  });
});

module.exports = router;
