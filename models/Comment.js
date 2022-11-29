const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  user: {
    _id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    username: { type: String },
  },
  likes: { type: Number, default: 0 },
  body: { type: String },
})

module.exports = new mongoose.model("Comment", commentSchema);
