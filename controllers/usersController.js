const User = require("../models/User");
const Review = require("../models/Review");

module.exports = {
  getAllUsers: async (req, res, next) => {
    try {
      let users = await User.find();
      res.render("users/allUsers", { users });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  getOneUser: async (req, res, next) => {
    try {
      let user = await User.findById(req.params.id).populate("lists").lean();
      let lists = user.lists;
      if (user._id.toString !== req.user._id.toString()) {
        lists = lists.filter((list) => !list.private);
      }
      let reviews = await Review.find({ "user._id": user._id }).lean();
      res.render("users/userProfile", { user, reviews, lists: user.lists });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
};
