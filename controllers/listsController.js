const List = require("../models/List");
const User = require("../models/User");

module.exports = {
  getAllLists: async (req, res) => {
    try {
      let lists = await List.find().lean();
      res.render("lists/allLists", { lists, title: "All Lists" });
    } catch (error) {
      console.error(error);
    }
  },
  getOneList: async (req, res) => {
    let id = req.params.id;
    try {
      let list = await List.findById(id).lean();
      res.render("lists/listPage", { list });
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
        let list = await List.findById(req.params._id).lean();
        res.render("lists/listForm", { ...list });
      } else {
        res.render("lists/listForm");
      }
    } catch (error) {
      console.error(error);
    }
  },
  addNewList: async (req, res) => {
    try {
      let addedList = await List.create({
        name: req.body.name,
        description: req.body.description,
        userId: req.user._id,
      });
      let user = await User.findById(req.user._id);
      user.lists.push({ name: addedList.name, _id: addedList._id });
      await user.save();
      res.redirect("/lists/my-lists");
    } catch (error) {
      console.error(error);
    }
  },
  updateList: async (req, res) => {
    let id = req.params.id;
    try {
      let updatedList = await List.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      res.json(updatedList);
    } catch (error) {
      console.error(error);
    }
  },
  deleteList: async (req, res) => {
    let id = req.params.id;
    try {
      let deletedList = await List.findByIdAndRemove(id);
      res.json(deletedList);
    } catch (error) {
      console.error(error);
    }
  },
};
