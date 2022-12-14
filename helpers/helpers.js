const {
  dateValue,
  truncate,
  editLikeButton,
  shouldThereBeAnS,
  options,
  button,
  scoreStars,
  gameGenres,
} = require("./ejs");

module.exports = (app) => {
  app.locals.truncate = truncate;
  app.locals.editLikeButton = editLikeButton;
  app.locals.shouldThereBeAnS = shouldThereBeAnS;
  app.locals.options = options;
  app.locals.button = button;
  app.locals.scoreStars = scoreStars;
  app.locals.gameGenres = gameGenres;
  app.locals.dateValue = dateValue;
};
