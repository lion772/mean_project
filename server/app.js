const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
app.use(cors()); // this uses default values

const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://username:password@cluster0.xe1fe.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  const postSchema = new mongoose.Schema({ post: String });
  const post = mongoose.model("post", postSchema);
  collection.save(post);
  client.close();
});

const port = process.env.PORT || 4000;

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

app.get("/", (req, res) => {
  res.send("running!");
});

app.post("/post", (req, res) => {
  console.log("receiving data ...");
  console.log("body is ", req.body);
  console.log("params are ", req.params);
  res.status(201).json({
    message: "Object created !",
  });
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
