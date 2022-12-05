const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { username, password } = require("../secrets.json");

mongoose
  .connect(
    `mongodb+srv://${username}:${password}@cluster0.xe1fe.mongodb.net/posts?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });

const postSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

module.exports = mongoose.model("Post", postSchema);
