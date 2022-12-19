const express = require("express");
const router = express.Router();
const Post = require("../model");
const multer = require("multer");
const { insertPost } = require("../../databasepg");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    /* MIME_TYPE_MAP[file.mimetype]
      ? cb(null, "./images")
      : cb(new Error("Invalid mime type"), "./images"); */
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "./images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, `${name} - ${Date.now()}.${ext}`);
  },
});

//MongoDB
router.post("/", multer(storage).single("image"), (req, res) => {
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
