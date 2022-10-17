const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema and Model

const postSchema = new Schema({ title: String, content: String });

const post = mongoose.model("post", postSchema);

module.exports = post;
