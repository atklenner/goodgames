const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listSchema = new Schema({
  name: { type: String, default: "Untitled" },
  user: {
    _id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    username: { type: String },
  },
  description: { type: String },
  games: [
    {
      name: { type: String, default: "Untitled" },
      genre: { type: String, default: "No Genre Given" },
      _id: { type: mongoose.Schema.Types.ObjectId, ref: "Game" },
    },
  ],
});

module.exports = new mongoose.model("List", listSchema);
