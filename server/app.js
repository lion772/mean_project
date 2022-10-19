const uploadRoute = require("./routes/upload");
const getRoute = require("./routes/posts");
const addRoute = require("./routes/add-post");
const deleteRoute = require("./routes/delete-post");
const express = require("express");
const bodyParser = require("body-parser");

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

app.all("/*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Origin, Content-Length, X-Requested-With, Accept"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

const cors = require("cors");
app.use(cors());

app.use("/", uploadRoute);
app.use("/", getRoute);
app.use("/", addRoute);
app.use("/", deleteRoute);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
