const express = require("express");
const router = express.Router();
const Post = require("../model");

router.put("/:id", (req, res) => {
  console.log("updated!", req.params.id, req.body);
  const reqToUpdate = req.body;
  Post.updateOne({ _id: req.params.id }, reqToUpdate).then((res) => {
    console.log("Updated successfully!", res);
  });
});

module.exports = router;
