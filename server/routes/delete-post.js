const express = require("express");
const router = express.Router();
const Post = require("../model");

router.delete("/delete/:id", function (req, res) {
  console.log("preparing to delete", req.params.id);
  Post.deleteOne({ _id: req.params.id }).then((data) => {
    console.log("Deleted successfully!", data);
    res.status(200).json({ message: "Deleted successfully!", isDeleted: true });
  });
});

module.exports = router;
