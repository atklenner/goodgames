const List = require("../models/List");
const User = require("../models/User");
const Game = require("../models/Game");

module.exports = {
  getHomePage: async (req, res) => {
    try {
      let user = await User.findById(req.user._id).populate("lists").lean();
      let mainList = await List.findById(user.mainList)
        .populate("games")
        .lean();
      let recentGames = await Game.find({}).limit(5).sort({ _id: "desc" }).lean();
      res.render("index", {
        user: req.user,
        lists: user.lists,
        mainList,
        recentGames,
      });
    } catch (error) {
      console.error(error);
    }
  },
};
