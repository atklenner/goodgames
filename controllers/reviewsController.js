const Review = require("../models/Review");
// let ratingValues = [
//   "Unrated",
//   "Did Not Like",
//   "It Was OK",
//   "Liked It",
//   "Loved It",
// ];
// EJS is being a pain
let completedValues = ["No", "Playing", "Yes", "Quit"];

module.exports = {
  addReviewPage: async (req, res) => {
    try {
      let review = await Review.findOne({
        gameId: req.params.gameId,
        userId: req.user._id,
      }).lean();
      if (!review) {
        review = {
          gameId: req.params.gameId,
          rating: "Unrated",
          completed: "No",
          body: "",
          _id: false,
        };
      }
      res.render("./reviews/reviewForm", {
        ...review,
        // ratingValues,
        completedValues,
      });
    } catch (error) {
      console.log(error);
    }
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
