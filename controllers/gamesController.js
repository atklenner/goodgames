const Game = require("../models/Game");

module.exports = {
  getAllGames: async (req, res) => {
    try {
      let games = await Game.find();
      res.render("allGames", { games });
    } catch (error) {
      console.error(error);
    }
  },
  getOneGame: async (req, res) => {
    try {
      let game = await Game.findById(req.params.id);
      res.render("gamePage", { game });
    } catch (error) {
      console.error(error);
    }
  },
  addNewGame: async (req, res) => {
    try {
      let addedGame = await Game.create(req.body);
      res.json(addedGame);
    } catch (error) {
      console.error(error);
    }
  },
  updateGame: async (req, res) => {
    let id = req.params.id;
    try {
      let updatedGame = await Game.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      res.json(updatedGame);
    } catch (error) {
      console.error(error);
    }
  },
  deleteGame: async (req, res) => {
    let id = req.params.id;
    try {
      let deletedGame = await Game.findByIdAndRemove(id);
      res.json(deletedGame);
    } catch (error) {
      console.error(error);
    }
  },
};
