const Game = require("../models/Game");

module.exports = {
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
