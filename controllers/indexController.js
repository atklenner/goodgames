const List = require("../models/List");
const Game = require("../models/Game");
const ListItem = require("../models/ListItem");
const User = require("../models/User");

module.exports = {
  getHomePage: async (req, res) => {
    try {
      let userLists = await List.find({ userID: req.user._id });
      let listItems = await ListItem.find();
      let games = await Game.find();
      let users = await User.find();
      res.render("index", {
        user: req.user,
        lists: userLists,
        listItems,
        games,
        users,
      });
    } catch (error) {
      console.error(error);
    }
  },
};
