const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listSchema = new Schema({
  name: { type: String, required: true },
  userId: { type: mongoose.ObjectId, required: true },
  listItems: [{ type: mongoose.ObjectId }],
});

module.exports = new mongoose.model("List", listSchema);
