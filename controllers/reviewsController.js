const Review = require("../models/Review");
const Game = require("../models/Game");

module.exports = {
  addReviewPage: async (req, res) => {
    try {
      let review = await Review.findById(req.params.id).lean();
      res.render("./reviews/reviewForm", {
        game: req.params.id, // if there is no review then the id is for the game not a review
        ...review,
        user: req.user,
      });
    } catch (error) {
      console.log(error);
    }
  },
  getReview: async (req, res) => {
    try {
      const review = await Review.findOne({ _id: req.params.id })
        .populate("game")
        .lean();
      res.render("./reviews/reviewPage", { review, user: req.user });
    } catch (error) {
      console.log(error);
    }
  },
  addReview: async (req, res) => {
    try {
      await Review.create({
        user: { _id: req.user._id, username: req.user.username },
        game: req.params.gameId,
        ...req.body,
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
          ...req.body,
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
  likeReview: async (req, res) => {
    try {
      await Review.findByIdAndUpdate(req.params.id, { $inc: { likes: 1 } });
      res.redirect(`/reviews/${req.params.id}`);
    } catch (error) {
      console.log(error);
    }
  },
};
