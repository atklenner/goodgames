const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listSchema = new Schema({
  name: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  description: { type: String },
  count: { type: Number, default: 0 },
  games: [
    {
      name: { type: String, default: "No Name Game" },
      genre: { type: String, default: "No Genre Given" },
      _id: { type: mongoose.Schema.Types.ObjectId, ref: "Game" },
    },
  ],
});

module.exports = new mongoose.model("List", listSchema);
