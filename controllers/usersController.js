const User = require("../models/User");
const Review = require("../models/Review");

module.exports = {
  getAllUsers: async (req, res, next) => {
    try {
      let users = await User.find({});
      res.render("users/allUsers", { user: req.user, users });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  getOneUser: async (req, res, next) => {
    try {
      let userProfile = await User.findById(req.params.id).populate("lists").lean();
      let lists = userProfile.lists;
      if (!req.user || userProfile._id.toString() !== req.user._id.toString()) {
        lists = lists.filter((list) => !list.private);
      }
      let reviews = await Review.find({ "user._id": userProfile._id }).populate("game").lean();
      res.render("users/userProfile", { user: req.user, reviews, lists, userProfile });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
};
