const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listItemSchema = new Schema({
  name: { type: String, required: true },
  genre: { type: String, required: true },
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
});

module.exports = mongoose.model("ListItem", listItemSchema);
