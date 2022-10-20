const List = require("../models/List");
// const ListItem = require("../models/ListItem")

module.exports = {
  getAllLists: async (req, res) => {
    try {
      let lists = await List.find();
      res.render("allLists", { lists });
    } catch (error) {
      console.error(error);
    }
  },
  getOneList: async (req, res) => {
    let id = req.params.id;
    try {
      let list = await List.findById(id).populate("listItems");
      res.render("listPage", { list });
    } catch (error) {
      console.error(error);
    }
  },
  addNewList: async (req, res) => {
    try {
      let addedList = await List.create(req.body);
      res.json(addedList);
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
