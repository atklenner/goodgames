const Game = require("../models/Game");
const cloudinary = require("../middleware/cloudinary");

module.exports = {
  getAllGames: async (req, res) => {
    try {
      let games = await Game.find();
      res.render("games/allGames", { games });
    } catch (error) {
      console.error(error);
    }
  },
  getOneGame: async (req, res) => {
    try {
      let game = await Game.findById(req.params.id);
      res.render("games/gamePage", { game });
    } catch (error) {
      console.error(error);
    }
  },
  addGamePage: (req, res) => {
    res.render("games/gameForm");
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
    try {
      let game = await Game.findById(req.params.id);
      await cloudinary.uploader.destroy(game.cloudinaryId);
      await Game.remove({ _id: req.params.id });
      res.redirect("games/allGames");
    } catch (error) {
      console.error(error);
    }
  },
};
