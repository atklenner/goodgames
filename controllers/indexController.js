const Game = require("../models/Game");

module.exports = {
  getHomePage: async (req, res) => {
    try {
      res.render("index");
    } catch (error) {
      console.error(error);
    }
  },
};
