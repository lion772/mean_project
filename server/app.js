const express = require("express");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();

const cors = require("cors");
app.use(cors()); // this uses default values
const mongoose = require("mongoose");
const Post = require("./model");

const TOKEN = process.env.MONGODB_PASSWORD;

console.log(TOKEN);

const port = process.env.PORT || 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.all("/*", function (req, res, next) {
  // Website you wish to allow to connect
  res.header("Access-Control-Allow-Origin", "*");
  // Request methods you wish to allow
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  // Request headers you wish to allow
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Origin, Content-Length, X-Requested-With, Accept"
  );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);
  // Pass to next layer of middleware
  next();
});

mongoose
  .connect(
    "mongodb+srv://username:password@cluster0.xe1fe.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  console.log("running!");
  Post.find()
    .then((data) => {
      console.log(data);
      res.status(200).send({ message: "success", posts: data });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/post", (req, res) => {
  console.log("body is ", req.body);
  let newPost = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  newPost.save().then((post) => {
    res.status(201).json({ msg: "Data stored successfully!", post: post });
  });
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
