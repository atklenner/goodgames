const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  name: { type: String, required: true },
  genres: [{ type: String }],
  dateReleased: { type: Date, default: Date.now },
  developer: { type: String, default: "N/A" },
  publisher: { type: String, default: "N/A" },
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
