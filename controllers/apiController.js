module.exports = {
  addNewGame: async (req, res) => {
    try {
      let newGame = req.body;
      let addedGame = await gamesCollection.insertOne(newGame);
      res.json(addedGame);
    } catch (error) {
      console.error(error);
    }
  },
  updateGame: async (req, res) => {
    let id = req.params.id;
    try {
      let updatedGame = await gamesCollection.findOneAndUpdate(
        { _id: ObjectId(id) },
        {
          $set: {
            name: req.body.name,
            genre: req.body.genre,
            rating: req.body.rating,
            completed: req.body.completed,
          },
        }
      );
      res.json(updatedGame);
    } catch (error) {
      console.error(error);
    }
  },
  deleteGame: async (req, res) => {
    let id = req.params.id;
    try {
      let deletedGame = await gamesCollection.deleteOne({
        _id: ObjectId(id),
      });
      res.json(deletedGame);
    } catch (error) {
      console.error(error);
    }
  },
};
