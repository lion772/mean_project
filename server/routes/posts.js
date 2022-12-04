const express = require("express");
const router = express.Router();
const Post = require("../model");
const { getPosts } = require("../../databasepg");

//Route Mongoose alternative
router.get("/", function (req, res) {
  console.log("Post-list route called!");
  Post.find()
    .then((rows) => {
      console.log(rows);
      res.json({ message: "posts retrieved!", posts: rows });
    })
    .catch((err) => {
      console.log(err);
    });
});

//Route PostgreSQL alternative
/*router.get("/", async function (req, res) {
  console.log("Post-list route called!");
  const posts = await getPosts();
  console.log("posts are here ", posts);
  res.json(posts["rows"]);
});*/

module.exports = router;

//Subject management data alternative
/*app.get("/", (req, res) => {
  console.log("running!");
  Post.find()
    .then((data) => {
      console.log(data);
      res.status(200).send({ message: "success", posts: data });
    })
    .catch((err) => {
      console.log(err);
    });
});*/
