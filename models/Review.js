const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let reviewSchema = new Schema({
  user: {
    _id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    username: { type: String },
  },
  game: { type: mongoose.Schema.Types.ObjectId, ref: "Game" },
  score: {
    type: String,
    default: "Unrated",
    enum: [
      "Unrated",
      "1 - Did Not Like",
      "2 - It Was OK",
      "3 - Liked It",
      "4 - Really Liked It",
      "5 - Loved It",
    ],
  },
  completed: { type: Boolean, default: false },
  body: { type: String },
  dateReviewed: { type: Date, default: Date.now },
  dateGameStarted: { type: Date },
  dateGameCompleted: { type: Date },
  timeSpentPlaying: { type: Number },
  likes: { type: Number, default: 0 },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

module.exports = mongoose.model("Review", reviewSchema);
