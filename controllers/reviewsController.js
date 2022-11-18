const Review = require("../models/Review");
const Game = require("../models/Game");
let ratingValues = [
  "Unrated",
  "Did Not Like",
  "It Was OK",
  "Liked It",
  "Really Liked It",
  "Loved It",
];
let completedValues = ["No", "Playing", "Yes", "Quit"];

module.exports = {
  addReviewPage: async (req, res) => {
    try {
      let review = await Review.findOne({
        "game._id": req.params.gameId,
        "user._id": req.user._id,
      }).lean();
      if (!review) {
        review = {
          game: { _id: req.params.gameId },
          rating: "Unrated",
        };
      }
      res.render("./reviews/reviewForm", {
        ...review,
        ratingValues,
        completedValues,
      });
    } catch (error) {
      console.log(error);
    }
  },
  getReview: async (req, res) => {
    try {
      const review = await Review.findOne({ _id: req.params.id });
      res.render("./reviews/reviewPage", { review, user: req.user });
    } catch (error) {
      console.log(error);
    }
  },
  addReview: async (req, res) => {
    try {
      let game = await Game.findById(req.params.gameId);
      await Review.create({
        user: { _id: req.user._id, username: req.user.username },
        game: { _id: game._id, name: game.name },
        rating: req.body.rating,
        completed: req.body.completed,
        body: req.body.body,
      });
      res.redirect(`/games/${req.params.gameId}`);
    } catch (error) {
      console.log(error);
    }
  },
  updateReview: async (req, res) => {
    try {
      let review = await Review.findOneAndUpdate(
        { _id: req.params.id },
        {
          rating: req.body.rating,
          completed: req.body.completed,
          body: req.body.body,
          dateReviewed: Date.now(),
        },
        {
          upsert: true,
          lean: true,
          runValidators: true,
        }
      );
      res.redirect(`/reviews/${review._id}`);
    } catch (error) {
      console.log(error);
    }
  },
  deleteReview: async (req, res) => {
    try {
      let review = await Review.findByIdAndRemove({ _id: req.params.id });
      res.redirect(`/games/${review.game._id}`);
    } catch (error) {
      console.log(error);
    }
  },
};
