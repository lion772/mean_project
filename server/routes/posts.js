const express = require("express");
const router = express.Router();
const Post = require("../model");

router.get("/", function (req, res) {
  console.log("Post-list route called!");
  Post.find()
    .then((rows) => {
      console.log(rows);
      res.json({ rows });
    })
    .catch((err) => {
      console.log(err);
    });
});

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
