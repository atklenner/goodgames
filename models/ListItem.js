const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listItemSchema = new Schema({
  gameId: { type: mongoose.Schema.Types.ObjectId, ref: "Game" },
  listId: { type: mongoose.Schema.Types.ObjectId, ref: "List" },
  dateAdded: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ListItem", listItemSchema);
