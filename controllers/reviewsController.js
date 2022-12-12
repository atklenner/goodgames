const Review = require("../models/Review");
const Game = require("../models/Game");
const Comment = require("../models/Comment");

module.exports = {
  addReviewPage: async (req, res, next) => {
    try {
      let review = await Review.findById(req.params.id).lean();

      // if review exists but it is the wrong user, send 404 page (for now)
      if (review && review.user._id.toString() !== req.user._id.toString()) {
        throw new Error("auth");
      }

      res.render("./reviews/reviewForm", {
        game: req.params.id, // if there is no review then the id is for the game not a review
        ...review,
        user: req.user,
      });
    } catch (error) {
      error.type = error.message === "auth" ? "auth" : "review";
      console.log(error);
      next(error);
    }
  },
  getReview: async (req, res, next) => {
    try {
      const review = await Review.findOne({ _id: req.params.id })
        .populate("game")
        .populate("comments")
        .lean();
      res.render("./reviews/reviewPage", { review, user: req.user });
    } catch (error) {
      error.type = "review";
      console.log(error);
      next(error);
    }
  },
  addReview: async (req, res, next) => {
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
      next(error);
    }
  },
  updateReview: async (req, res, next) => {
    req.body.completed = req.body.completed === "on" ? true : false;
    try {
      let review = await Review.findById(req.params.id);

      // returns 404 if the wrong user tries to update the review
      if (review.user._id.toString() !== req.user._id.toString()) {
        throw new Error("auth");
      }

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
      error.type = error.message === "auth" ? "auth" : "review";
      console.log(error);
      next(error);
    }
  },
  deleteReview: async (req, res, next) => {
    try {
      let review = await Review.findById(req.params.id);

      // returns 404 is the wrong user tries to update the review
      if (review.user._id.toString() !== req.user._id.toString()) {
        throw new Error("auth");
      }

      await review.remove();
      res.redirect(`/games/${review.game._id}`);
    } catch (error) {
      error.type = error.message === "auth" ? "auth" : "review";
      console.log(error);
      next(error);
    }
  },
  likeReview: async (req, res, next) => {
    try {
      let review = await Review.findById(req.params.id);

      // returns 404 is the user tries to like their own list, no free clout!
      if (review.user._id.toString() === req.user._id.toString()) {
        throw new Error("auth");
      }

      await review.updateOne({ $inc: {likes : 1} });
      res.redirect(`/reviews/${req.params.id}`);
    } catch (error) {
      error.type = error.message === "auth" ? "auth" : "review";
      console.log(error);
      next(error);
    }
  },
  addComment: async (req, res, next) => {
    try {
      let newComment = await Comment.create({
        user: { _id: req.user._id, username: req.user.username },
        body: req.body.body,
      })
      let review = await Review.findById(req.params.id);
      review.comments.push(newComment._id);
      review.save();
      res.redirect(`/reviews/${req.params.id}`);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
};
