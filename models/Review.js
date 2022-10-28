const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let reviewSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  gameId: { type: mongoose.Schema.Types.ObjectId, ref: "Game" },
  rating: {
    type: String,
    default: "Unrated",
    enum: ["Unrated", "Did Not Like", "It Was OK", "Liked It", "Loved It"],
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
