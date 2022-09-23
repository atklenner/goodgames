const Game = require("../models/Game");

module.exports = {
  getHomePage: async (req, res) => {
    try {
      let games = await Game.find().lean();
      res.render("index", { games });
    } catch (error) {
      console.error(error);
    }
  },
};
