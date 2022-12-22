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
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "server/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, `${name} - ${Date.now()}.${ext}`);
  },
});

//MongoDB
router.post("/", multer({ storage: storage }).single("image"), (req, res) => {
  console.log("******************************");
  console.log("body is ", req.body);
  console.log("******************************");

  const url = `${req.protocol}://${req.get("host")}`;

  let addPost = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: `${url}/images/${req.file.filename}`,
  });
  addPost.save().then((post) => {
    const newlyCreatedPost = {
      id: post._doc._id,
      title: post._doc.title,
      content: post._doc.content,
      imagePath: post._doc.imagePath,
    };

    res.status(201).json({
      msg: "Data stored successfully!",
      post: newlyCreatedPost,
    });
  });
});

//PostgreSQL
/*router.post("/", async function (req, res) {
  console.log("body is ", req.body);
  await insertPost(req.body.title, req.body.content);
  res.status(201).json({ msg: "Data stored successfully!"});
});*/

module.exports = router;
