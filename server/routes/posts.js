const express = require("express");
const router = express.Router();
const Post = require("../model");
const { getPosts } = require("../../databasepg");
const { getPositionOfLineAndCharacter } = require("typescript");
const { LiteralPrimitive } = require("@angular/compiler");

//Route Mongoose alternative
router.get("/", function (req, res) {
  console.log("Post-list route called!");
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();

  if (pageSize && currentPage) {
    postQuery.skip(pageSize + (currentPage - 1)).limit(pageSize);
  }

  postQuery
    .then((rows) => {
      console.log(rows);
      res.status(200).json({ message: "posts retrieved!", posts: rows });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/:id", (req, res) => {
  console.log("*****************************");
  console.log("Get post from a given id");
  console.log("*****************************");

  Post.find({ _id: req.params.id })
    .then((rows) => {
      console.log("RESPONSE: ", rows);
      res.status(200).json({ message: "post retrieved!", post: rows });
    })
    .catch((err) =>
      res.status(404).json({ message: `Post not found. Error: ${err.message}` })
    );
});

//Route PostgreSQL alternative
/*router.get("/", async function (req, res) {
  console.log("Post-list route called!");
  const posts = await getPosts();
  console.log("posts are here ", posts);
  res.json(posts["rows"]);
});*/

module.exports = router;
