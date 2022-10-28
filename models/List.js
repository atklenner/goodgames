const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listSchema = new Schema({
  name: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  description: { type: String },
});

module.exports = new mongoose.model("List", listSchema);
