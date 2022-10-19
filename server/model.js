const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose
  .connect(
    "mongodb+srv://lion772:kagebushin22@cluster0.xe1fe.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });

//Create Schema and Model

const postSchema = new Schema({ title: String, content: String });

const post = mongoose.model("post", postSchema);

module.exports = post;
