const Review = require("../models/Review");
const Game = require("../models/Game");

module.exports = {
  addReviewPage: async (req, res, next) => {
    try {
      let review = await Review.findById(req.params.id).lean();

      // if review exists but it is the wrong user, send 404 page (for now)
      if (review && review.user._id.toString() !== req.user._id.toString()) next();

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
    req.body.completed = req.body.completed === "on" ? true : false;
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
    req.body.completed = req.body.completed === "on" ? true : false;
    try {
      let review = await Review.findById(req.params.id);

      // returns 404 if the wrong user tries to update the review
      if (review.user._id.toString() !== req.user._id.toString()) next();

      await review.updateOne(
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
      let review = await Review.findById(req.params.id);

      // returns 404 is the wrong user tries to update the review
      if (review.user._id.toString() !== req.user._id.toString()) next();

      await review.remove();
      res.redirect(`/games/${review.game._id}`);
    } catch (error) {
      console.log(error);
    }
  },
  likeReview: async (req, res) => {
    try {
      let review = await Review.findById(req.params.id);

      // returns 404 is the user tries to like their own list, no free clout!
      if (review.user._id.toString() === req.user._id.toString()) next();

      await review.updateOne({ $inc: {likes : 1} });
      res.redirect(`/reviews/${req.params.id}`);
    } catch (error) {
      console.log(error);
    }
  },
};
