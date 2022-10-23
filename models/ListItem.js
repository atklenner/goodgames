const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listItemSchema = new Schema({
  gameId: { type: mongoose.Schema.Types.ObjectId, ref: "Game" },
  listId: { type: mongoose.Schema.Types.ObjectId, ref: "List" },
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
  dateAdded: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ListItem", listItemSchema);
