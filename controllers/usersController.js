const User = require("../models/User");

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
      let user = await User.findById(req.params.id);
      res.render("users/userProfile", { user });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
};
