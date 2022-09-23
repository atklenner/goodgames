module.exports = {
  getHomePage: async (req, res) => {
    try {
      let games = await gamesCollection.find().toArray();
      res.render("index", { games });
    } catch (error) {
      console.error(error);
    }
  },
};
