const List = require("../models/List");
const User = require("../models/User");
const Game = require("../models/Game");
const Comment = require("../models/Comment");
const { errorType } = require('../helpers/errorType');

module.exports = {
  getAllLists: async (req, res, next) => {
    try {
      let lists = await List.find({ private: false }).sort({ likes: -1 }).lean();
      res.render("lists/allLists", {
        lists,
        title: "All Lists",
        user: req.user,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  getOneList: async (req, res, next) => {
    try {
      let list = await List.findById(req.params.id)
        .populate({ 
          path: "games comments", 
          transform: (doc, id) => doc == null ? id : doc 
        })
        .lean();
      res.render("lists/listPage", { list, user: req.user });
    } catch (error) {
      error.type = "list";
      console.error(error);
      next(error);
    }
  },
  getLoggedInUserLists: async (req, res, next) => {
    try {
      let user = await User.findById(req.user._id).populate("lists").lean();
      res.render("lists/allLists", {
        lists: user.lists,
        title: "My Lists",
        user: req.user,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  getListForm: async (req, res, next) => {
    try {
      if (req.params.id) {
        let list = await List.findById(req.params.id).lean();

        // returns 404 if req.user is not the list creator
        if (list.user._id.toString() !== req.user._id.toString()) {
          throw new Error("auth");
        } 

        res.render("lists/listForm", { ...list, user: req.user });
      } else {
        res.render("lists/listForm", { user: req.user });
      }
    } catch (error) {
      error.type = errorType(error);
      console.error(error);
      next(error);
    }
  },
  addNewList: async (req, res, next) => {
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
      next(error);
    }
  },
  updateList: async (req, res, next) => {
    req.body = req.body.private
      ? { ...req.body, private: true }
      : { ...req.body, private: false };
    try {
      let updatedList = await List.findById(req.params.id);

      // returns 404 is req.user is not the list creator
      if (updatedList.user._id.toString() !== req.user._id.toString()) {
        throw new Error("auth");
      }

      await updatedList.updateOne(req.body, {
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
      error.type = errorType(error);
      console.error(error);
      next(error);
    }
  },
  addListGame: async (req, res, next) => {
    try {
      let list = await List.findById(req.body.listId);

      // returns 404 if req.user is not the list creator
      if (list.user._id.toString() !== req.user._id.toString()) {
        throw new Error("auth");
      }

      if (!list.games.find((elt) => elt._id == req.params.gameId)) {
        list.games.push(req.params.gameId);
        await list.save();
      }
      res.redirect(`/games/${req.params.gameId}`);
    } catch (error) {
      error.type = errorType(error);
      console.log(error);
      next(error);
    }
  },
  deleteList: async (req, res, next) => {
    try {
      let list = await List.findById(req.params.id);

      // returns 404 is req.user is not the list creator
      if (list.user._id.toString() !== req.user._id.toString()) {
        throw new Error("auth");
      }

      await list.remove();
      res.redirect("/lists/my-lists");
    } catch (error) {
      error.type = errorType(error);
      console.error(error);
      next(error);
    }
  },
  removeListGame: async (req, res, next) => {
    try {
      let list = await List.findById(req.params.id);

      // returns 404 is req.user is not list creator
      if (list.user._id.toString() !== req.user._id.toString()) {
        throw new Error("auth");
      }
      
      list.games = list.games.filter((elt) => {
        if (elt._id != req.params.gameId) return true;
        return false;
      });
      await list.save();
      res.redirect(`/lists/${req.params.id}`);
    } catch (error) {
      error.type = errorType(error);
      console.log(error);
      next(error);
    }
  },
  likeList: async (req, res, next) => {
    try {
      let list = await List.findById(req.params.id);

      // returns 404 is list creator likes their own list, no free clout!
      if (list.user._id.toString() === req.user._id.toString()) {
        throw new Error("auth");
      }

      await list.updateOne({ $inc: { likes: 1 } });
      res.redirect(`/lists/${req.params.id}`);
    } catch (error) {
      error.type = errorType(error);
      console.log(error);
      next(error);
    }
  },
  // this should probably be in the comments controller but I'm too lazy to move it
  addComment: async (req, res, next) => {
    try {
      let newComment = await Comment.create({
        user: { _id: req.user._id, username: req.user.username },
        body: req.body.body,
      })
      let list = await List.findById(req.params.id);
      list.comments.push(newComment._id);
      list.save();
      res.redirect(`/lists/${req.params.id}`);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
};

