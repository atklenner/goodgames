const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  name: { type: String, required: true },
  genre: { type: String, required: true },
  image: {
    type: String,
    default:
      "https://res.cloudinary.com/dvrfafdas/image/upload/v1664577624/v524oiqgy1w0syflt2a3.jpg",
  },
  cloudinaryId: { type: String, default: "v524oiqgy1w0syflt2a3" },
});

module.exports = mongoose.model("Game", gameSchema);
