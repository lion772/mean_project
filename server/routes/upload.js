const express = require("express");
const router = express.Router();
const Post = require("../model");

router.put("/:id", (req, res) => {
  console.log("*****************************");
  console.log("updated!", req.params.id, req.body);
  console.log("*****************************");
  const reqToUpdate = req.body;

  Post.updateOne({ _id: req.params.id }, reqToUpdate)
    .then((data) => {
      console.log(data);
      res.status(200).json({ message: "Successfully updated!" });
    })
    .catch((err) =>
      res
        .status(404)
        .json({ message: `Post not updated. Error: ${err.message}` })
    );
});

module.exports = router;
