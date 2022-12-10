const express = require("express");
const router = express.Router();
const Post = require("../model");
const { insertPost } = require("../../databasepg");

//MongoDB
router.post("/", function (req, res) {
  console.log("body is ", req.body);
  let addPost = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  addPost.save().then((post) => {
    console.log(post);
    res.status(201).json({ msg: "Data stored successfully!", post });
  });
});

//PostgreSQL
/*router.post("/", async function (req, res) {
  console.log("body is ", req.body);
  await insertPost(req.body.title, req.body.content);
  res.status(201).json({ msg: "Data stored successfully!"});
});*/

module.exports = router;
