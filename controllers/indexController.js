const List = require("../models/List");
const User = require("../models/User");
const Game = require("../models/Game");
const Review = require("../models/Review");

module.exports = {
  getHomePage: async (req, res, next) => {
    try {
      let user = await User.findById(req.user._id).populate("lists").lean();
      let mainList = await List.findById(user.mainList)
        .populate("games")
        .lean();
      let newGames = await Game.find({}).limit(5).sort({ _id: "desc" }).lean();
      let recentReviews = await Review.find({}).limit(5).sort({ _id: "desc" }).populate("game").lean();
      res.render("index", {
        user: req.user,
        lists: user.lists,
        mainList,
        newGames,
        recentReviews,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
};
