const {
  truncate,
  editLikeButton,
  shouldThereBeAnS,
  options,
  button,
} = require("./ejs");

module.exports = (app) => {
  app.locals.truncate = truncate;
  app.locals.editLikeButton = editLikeButton;
  app.locals.shouldThereBeAnS = shouldThereBeAnS;
  app.locals.options = options;
  app.locals.button = button;
};
