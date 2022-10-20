const User = require("../models/User");

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      let users = await User.find();
      res.render("allUsers", { users });
    } catch (error) {
      console.error(error);
    }
  },
  getOneUser: async (req, res) => {
    try {
      let user = await User.findById(req.params.id);
      res.render("userProfile", { user });
    } catch (error) {
      console.error(error);
    }
  },
};
