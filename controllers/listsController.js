const List = require("../models/List");
const User = require("../models/User");
const Game = require("../models/Game");

module.exports = {
  getAllLists: async (req, res) => {
    try {
      let lists = await List.find({ private: false }).lean();
      res.render("lists/allLists", { lists, title: "All Lists" });
    } catch (error) {
      console.error(error);
    }
  },
  getOneList: async (req, res) => {
    try {
      let list = await List.findById(req.params.id).lean();
      res.render("lists/listPage", { list, user: req.user });
    } catch (error) {
      console.error(error);
    }
  },
  getLoggedInUserLists: async (req, res) => {
    try {
      let user = await User.findById(req.user._id).lean();
      res.render("lists/allLists", { lists: user.lists, title: "My Lists" });
    } catch (error) {
      console.error(error);
    }
  },
  getListForm: async (req, res) => {
    try {
      if (req.params.id) {
        let list = await List.findById(req.params.id).lean();
        res.render("lists/listForm", { list });
      } else {
        res.render("lists/listForm");
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
      user.lists.push({ name: addedList.name, _id: addedList._id });
      if (mainList) {
        user.mainList = { _id: addedList._id, name: addedList.name };
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
      let user = await User.findById(req.user._id);
      if (req.body.mainList) {
        user.mainList = { _id: updatedList._id, name: updatedList.name };
      }
      user.lists = user.lists.map((list) => {
        if (list._id.toString() === updatedList._id.toString()) {
          return { name: req.body.name, _id: updatedList._id };
        }
        return list;
      });
      await user.save();
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
        list.games.push({ name: game.name, genre: game.genre, _id: game._id });
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
      let user = await User.findById(req.user._id);
      user.lists = user.lists.filter((list) => {
        if (list._id.toString() !== req.params.id) return true;
        return false;
      });
      user.save();
      res.redirect("/lists/my-lists");
    } catch (error) {
      console.error(error);
    }
  },
  removeListGame: async (req, res) => {
    try {
      let list = await List.findById(req.params.id);
      list.games = list.games.filter((elt) => {
        if (elt._id.toString() !== req.params.gameId) return true;
        return false;
      });
      await list.save();
      res.redirect(`/lists/${req.params.id}`);
    } catch (error) {
      console.log(error);
    }
  },
};
