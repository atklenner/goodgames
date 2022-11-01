const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  name: { type: String, required: true },
  genre: { type: String, required: true },
  image: {
    type: String,
    required: true,
  },
  cloudinaryId: { type: String, required: true },
});

module.exports = mongoose.model("Game", gameSchema);
