const Review = require("../models/Review");

module.exports = {
  addReviewPage: (req, res) => {
    res.render("./reviews/reviewForm", { gameId: req.params.gameId });
  },
  getReview: async (req, res) => {
    try {
      const review = await Review.findOne({ _id: req.params.id });
      res.render("./reviews/reviewPage", { review });
    } catch (error) {
      console.log(error);
    }
  },
  addReview: async (req, res) => {
    try {
      let newReview = await Review.create({
        userId: req.user._id,
        gameId: req.params.gameId,
        rating: req.body.rating,
        completed: req.body.completed,
        body: req.body.body,
      });
      res.redirect(`/games/${req.params.gameId}`);
    } catch (error) {
      console.log(error);
    }
  },
  updateReview: () => {},
  deleteReview: () => {},
};
