const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let reviewSchema = new Schema({
  user: {
    _id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    username: { type: String },
  },
  game: {
    _id: { type: mongoose.Schema.Types.ObjectId, ref: "Game" },
    name: { type: String },
  },
  rating: {
    type: String,
    default: "Unrated",
    enum: [
      "Unrated",
      "Did Not Like",
      "It Was OK",
      "Liked It",
      "Really Liked It",
      "Loved It",
    ],
  },
  completed: {
    type: String,
    default: "No",
    enum: ["No", "Playing", "Yes", "Quit"],
  },
  body: { type: String },
  dateReviewed: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Review", reviewSchema);
