const List = require("../models/List");
const User = require("../models/User");

module.exports = {
  getHomePage: async (req, res) => {
    try {
      let user = await User.findById(req.user._id).lean();
      let mainList = await List.findById(user.mainList).lean();
      res.render("index", {
        user: req.user,
        lists: user.lists,
        mainList,
      });
    } catch (error) {
      console.error(error);
    }
  },
};
