const Game = require("../models/Game");
const Review = require("../models/Review");
const User = require("../models/User");
const cloudinary = require("../middleware/cloudinary");

module.exports = {
  getAllGames: async (req, res) => {
    try {
      let games = await Game.find();
      res.render("games/allGames", { games, user: req.user });
    } catch (error) {
      console.error(error);
    }
  },
  getOneGame: async (req, res) => {
    try {
      let gameReq = Game.findById(req.params.id).lean();
      let allReviewsReq = Review.find({ game: req.params.id }).lean();
      let userReviewReq = Review.findOne({
        game: req.params.id,
        "user._id": req.user._id,
      }).lean();
      let userReq = User.findById(req.user._id).populate("lists");
      let [game, allReviews, userReview, user] = await Promise.all([
        gameReq,
        allReviewsReq,
        userReviewReq,
        userReq,
      ]);
      res.render("games/gamePage", {
        game,
        allReviews,
        userReview,
        lists: user.lists,
        user: req.user,
      });
    } catch (error) {
      console.error(error);
    }
  },
  addGamePage: (req, res) => {
    res.render("games/gameForm", { user: req.user });
  },
  addNewGame: async (req, res) => {
    try {
      let image = await cloudinary.uploader.upload(req.file.path);
      let addedGame = await Game.create({
        ...req.body,
        image: image.secure_url,
        cloudinaryId: image.public_id,
      });
      res.redirect(`/games/${addedGame._id}`);
    } catch (error) {
      console.error(error);
    }
  },
  updateGamePage: async (req, res) => {
    try {
      let game = await Game.findById({ _id: req.params.id }).lean();
      if (game) {
        res.render("games/gameForm", { ...game, user: req.user });
      } else {
        res.render("404");
      }
    } catch (error) {
      console.log(error);
    }
  },
  updateGame: async (req, res) => {
    try {
      let game = { ...req.body };
      if (req.file) {
        let image = await cloudinary.uploader.upload(req.file.path);
        game = {
          ...game,
          image: image.secure_url,
          cloudinaryId: image.public_id,
        };
      }
      let updatedGame = await Game.findOneAndUpdate(
        { _id: req.params.id },
        game,
        {
          new: true,
          runValidators: true,
          lean: true,
        }
      );
      res.redirect(`/games/${updatedGame._id}`);
    } catch (error) {
      console.error(error);
    }
  },
  deleteGame: async (req, res) => {
    try {
      let game = await Game.findByIdAndRemove({ _id: req.params.id });
      await cloudinary.uploader.destroy(game.cloudinaryId);
      res.redirect("/games");
    } catch (error) {
      console.error(error);
    }
  },
};
