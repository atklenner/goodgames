const List = require("../models/List");
const Game = require("../models/Game");
const ListItem = require("../models/ListItem");
const User = require("../models/User");

module.exports = {
  getHomePage: async (req, res) => {
    try {
      let userLists = await List.find({ userId: req.user._id }).lean();
      let playingList = await List.findOne({
        userId: req.user._id,
        name: "Currently Playing",
      }).lean();
      let playingListItems = await ListItem.find({
        listId: playingList._id,
      })
        .limit(5)
        .populate("gameId")
        .lean();
      res.render("index", {
        user: req.user,
        lists: userLists,
        currentGames: playingListItems,
      });
    } catch (error) {
      console.error(error);
    }
  },
};
