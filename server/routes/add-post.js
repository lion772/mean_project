const express = require("express");
const router = express.Router();
const Post = require("../model");
const { insertPost } = require("../../databasepg");

//Mongoose
router.post("/", function (req, res) {
  console.log("body is ", req.body);
  let newPost = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  newPost.save().then((post) => {
    res.status(201).json({ msg: "Data stored successfully!", post: post });
  });
});

//PostgreSQL
/*router.post("/", async function (req, res) {
  console.log("body is ", req.body);
  let newPost =  new Post({
    title: req.body.title,
    content: req.body.content,
  });
  await insertPost(req.body.title, req.body.content);
});*/

module.exports = router;
