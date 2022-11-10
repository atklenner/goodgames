const Game = require("../models/Game");
const Review = require("../models/Review");
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
      // these are concurrent
      let game = await Game.findById(req.params.id).lean();
      let allReviews = await Review.find({ gameId: req.params.id }).lean();
      let userReview = await Review.findOne({
        gameId: req.params.id,
        userId: req.user._id,
      }).lean();
      console.log(userReview);
      res.render("games/gamePage", { game, allReviews, userReview });
    } catch (error) {
      console.error(error);
    }
  },
  addGamePage: (req, res) => {
    res.render("games/gameForm");
  },
  addNewGame: async (req, res) => {
    try {
      let image = await cloudinary.uploader.upload(req.file.path);
      let addedGame = await Game.create({
        name: req.body.name,
        genre: req.body.genre,
        image: image.secure_url,
        cloudinaryId: image.public_id,
      });
      res.redirect(`/games/${addedGame._id}`);
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
      let game = await Game.findById({ _id: req.params.id });
      await cloudinary.uploader.destroy(game.cloudinaryId);
      await Game.remove({ _id: req.params.id });
      res.redirect("/games");
    } catch (error) {
      console.error(error);
    }
  },
};
