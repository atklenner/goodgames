const List = require("../models/List");
const User = require("../models/User");
const Game = require("../models/Game");

module.exports = {
  getAllLists: async (req, res) => {
    try {
      let lists = await List.find({ private: false }).lean();
      res.render("lists/allLists", {
        lists,
        title: "All Lists",
        user: req.user,
      });
    } catch (error) {
      console.error(error);
    }
  },
  getOneList: async (req, res) => {
    try {
      let list = await List.findById(req.params.id).populate("games").lean();
      res.render("lists/listPage", { list, user: req.user });
    } catch (error) {
      console.error(error);
    }
  },
  getLoggedInUserLists: async (req, res) => {
    try {
      let user = await User.findById(req.user._id).populate("lists").lean();
      res.render("lists/allLists", {
        lists: user.lists,
        title: "My Lists",
        user: req.user,
      });
    } catch (error) {
      console.error(error);
    }
  },
  getListForm: async (req, res) => {
    try {
      if (req.params.id) {
        let list = await List.findById(req.params.id).lean();
        res.render("lists/listForm", { list, user: req.user });
      } else {
        res.render("lists/listForm", { user: req.user });
      }
    } catch (error) {
      console.error(error);
    }
  },
  addNewList: async (req, res) => {
    let private = req.body.private ? true : false;
    try {
      let addedList = await List.create({
        name: req.body.name,
        description: req.body.description,
        user: { _id: req.user._id, username: req.user.username },
        private,
      });
      let user = await User.findById(req.user._id);
      user.lists.push(addedList._id);
      if (req.body.mainList) {
        user.mainList = addedList._id;
      }
      await user.save();
      res.redirect("/lists/my-lists");
    } catch (error) {
      console.error(error);
    }
  },
  updateList: async (req, res) => {
    req.body = req.body.private
      ? { ...req.body, private: true }
      : { ...req.body, private: false };
    try {
      let updatedList = await List.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (req.body.mainList) {
        await User.findByIdAndUpdate(req.user._id, {
          mainList: updatedList._id,
        });
      }
      res.redirect(`/lists/${updatedList._id}`);
    } catch (error) {
      console.error(error);
    }
  },
  addListGame: async (req, res) => {
    try {
      let list = await List.findById(req.body.listId);
      let game = await Game.findById(req.params.gameId);
      if (
        !list.games.find((elt) => elt._id.toString() === game._id.toString())
      ) {
        list.games.push(game._id);
        await list.save();
      }
      res.redirect(`/games/${game._id}`);
    } catch (error) {
      console.log(error);
    }
  },
  deleteList: async (req, res) => {
    try {
      await List.findByIdAndRemove(req.params.id);
      res.redirect("/lists/my-lists");
    } catch (error) {
      console.error(error);
    }
  },
  removeListGame: async (req, res) => {
    try {
      let list = await List.findById(req.params.id);
      list.games = list.games.filter((elt) => {
        if (elt.toString() !== req.params.gameId) return true;
        return false;
      });
      await list.save();
      res.redirect(`/lists/${req.params.id}`);
    } catch (error) {
      console.log(error);
    }
  },
  likeList: async (req, res) => {
    try {
      await List.findByIdAndUpdate(req.params.id, { $inc: { likes: 1 } });
      res.redirect(`/lists/${req.params.id}`);
    } catch (error) {
      console.log(error);
    }
  },
};
