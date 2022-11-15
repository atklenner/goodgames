const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listSchema = new Schema({
  name: { type: String, default: "Untitled" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
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

// what if instead of userId I just had user and it contained
// the name and _id of the user???
