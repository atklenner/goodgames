const {
  truncate,
  editLikeButton,
  shouldThereBeAnS,
  options,
  button,
  scoreStars,
} = require("./ejs");

module.exports = (app) => {
  app.locals.truncate = truncate;
  app.locals.editLikeButton = editLikeButton;
  app.locals.shouldThereBeAnS = shouldThereBeAnS;
  app.locals.options = options;
  app.locals.button = button;
  app.locals.scoreStars = scoreStars;
};
