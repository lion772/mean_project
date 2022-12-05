const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const updateRoute = require("./routes/upload");
const addRoute = require("./routes/add-post");
const deleteRoute = require("./routes/delete-post");
const getRoute = require("./routes/posts");

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Origin, Content-Length, X-Requested-With, Accept"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use("/list", getRoute);
app.use("/insert", addRoute);
app.use("/delete", deleteRoute);
app.use("/update", updateRoute);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
