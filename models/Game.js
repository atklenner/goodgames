const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  name: { type: String, required: true },
  genres: [{ type: String }],
  developer: { type: String, required: true },
  publisher: { type: String, required: true },
  rating: {
    type: String,
    default: "Rating Pending",
    enum: [
      "Rating Pending",
      "Everyone",
      "Everyone 10+",
      "Teen",
      "Mature 17+",
      "Adults Only 18+",
    ],
  },
  image: {
    type: String,
    required: true,
  },
  cloudinaryId: { type: String, required: true },
});

module.exports = mongoose.model("Game", gameSchema);
