const Game = require("../models/Game");
const Review = require("../models/Review");
const User = require("../models/User");
const cloudinary = require("../middleware/cloudinary");
const { queryBuilder } = require('../helpers/query');

module.exports = {
  getAllGames: async (req, res, next) => {
    let query = queryBuilder(req);
    try {
     let games = await Game.aggregate(query)
      res.render("games/allGames", { 
        games, 
        user: req.user, 
        checkedGenres: req.query.genres ?? [],
        name: req.query.name ?? "",
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  getOneGame: async (req, res, next) => {
    try {
      let gameReq = Game.findById(req.params.id).lean();
      let allReviewsReq = Review.find({ game: req.params.id }).sort({ likes: -1 }).lean();
      // let userReviewReq = Review.findOne({
      //   game: req.params.id,
      //   "user._id": req.user._id,
      // }).lean();
      // let userReq = User.findById(req.user._id).populate("lists");
      let userReviewReq = Promise.resolve(null);
      let userReq = Promise.resolve(null);
      console.log("req.user", req.user);
      if (req.user) {
        userReviewReq = Review.findOne({
          game: req.params.id,
          "user._id": req.user._id,
        }).lean();
        userReq = User.findById(req.user._id).populate("lists");
      }
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
        lists: user ? user.lists : [],
        user: req.user,
      });
    } catch (error) {
      error.type = "game";
      console.error(error);
      next(error);
    }
  },
  addGamePage: (req, res) => {
    res.render("games/gameForm", { user: req.user });
  },
  addNewGame: async (req, res, next) => {
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
      next(error);
    }
  },
  updateGamePage: async (req, res, next) => {
    try {
      let game = await Game.findById({ _id: req.params.id }).lean();
      res.render("games/gameForm", { ...game, user: req.user });
    } catch (error) {
      error.type = "game";
      console.log(error);
      next(error);
    }
  },
  updateGame: async (req, res, next) => {
    try {
      let updatedGame = await Game.findById(req.params.id);
      let game = { ...req.body };
      if (req.file) {
        let image = await cloudinary.uploader.upload(req.file.path);
        game = {
          ...game,
          image: image.secure_url,
          cloudinaryId: image.public_id,
        };
      }
      await updatedGame.updateOne(
        game,
        {
          runValidators: true,
          lean: true,
        }
      );
      res.redirect(`/games/${updatedGame._id}`);
    } catch (error) {
      error.type = "game";
      console.error(error);
      next(error);
    }
  },
  deleteGame: async (req, res, next) => {
    try {
      let game = await Game.findByIdAndRemove(req.params.id);
      await cloudinary.uploader.destroy(game.cloudinaryId);
      await Review.deleteMany({ game: req.params.id });
      res.redirect("/games");
    } catch (error) {
      error.type = "game";
      console.error(error);
      next(error);
    }
  },
};
